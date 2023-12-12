import { StringColumn } from "./StringColumn";
import { StringColumnTypeEnum } from "./StringColumnTypeEnum";
import { Connection } from "../../Database/Connection";
import chalk from "chalk";

jest.mock("../../Database/Connection", () => {
  return {
    Connection: jest.fn().mockImplementation(() => ({
      escape: jest.fn().mockImplementation(async (value: string) => `\`${value}\``),
      query: jest.fn()
    }))
  };
});

console.warn = jest.fn();

describe("StringColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const stringColumn = new StringColumn("name", { nullable: true, addAfter: "otherColumn" });
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("sets length to undefined if type is not VARCHAR", () => {
      const stringColumn = new StringColumn(
        "name",
        {
          type: StringColumnTypeEnum.MEDIUMTEXT,
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.MEDIUMTEXT,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("sets length if type is VARCHAR", () => {
      const stringColumn = new StringColumn(
        "name",
        {
          type: StringColumnTypeEnum.VARCHAR,
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("sets length if no type is passed", () => {
      const stringColumn = new StringColumn(
        "name",
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const stringColumn = new StringColumn("name", { nullable: true, addAfter: "otherColumn" });
      await stringColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("name");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const stringColumn = new StringColumn("name", { nullable: true, addAfter: "otherColumn" });
      await stringColumn.create(mockConnection, "testTable", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("name");
      expect(mockConnection.escape).toHaveBeenCalledWith("testTable");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("ALTER TABLE"));
    });
    
  });
  
  describe("generates correct SQL query based on options", () => {
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    const testCases = [
      {
        name: "logs warning when addAfter is set but createTable is true",
        createTable: true,
        warning: "WARNING: addAfter option is ignored when creating a new table.",
        query: "CREATE TABLE `test_table` (`name` VARCHAR(255) NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "type override works correctly",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `name` MEDIUMTEXT NOT NULL;",
        options: {
          type: StringColumnTypeEnum.MEDIUMTEXT
        }
      },
      {
        name: "all options are set",
        createTable: true,
        query: "CREATE TABLE `test_table` (`name` MEDIUMTEXT NULL);",
        options: {
          type: StringColumnTypeEnum.MEDIUMTEXT,
          nullable: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "default value is wrapped in quotes",
        createTable: true,
        query: "CREATE TABLE `test_table` (`name` VARCHAR(255) NULL DEFAULT 'default value');",
        options: {
          nullable: true,
          default: "default value",
          addAfter: "afterColumnName"
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const stringColumn = new StringColumn("name", testCase.options);
        await stringColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(console.warn).toHaveBeenCalledWith(chalk.yellowBright(testCase.warning));
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
