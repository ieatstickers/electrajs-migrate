import { IntColumn } from "./IntColumn";
import { IntColumnTypeEnum } from "./IntColumnTypeEnum";
import { Connection } from "../../Database/Connection";
import { Log } from "../../../Utility/Log/Log";

jest.mock("../../../Utility/Log/Log");
jest.mock("../../Database/Connection", () => {
  return {
    Connection: jest.fn().mockImplementation(() => ({
      escape: jest.fn().mockImplementation(async (value: string) => `\`${value}\``),
      query: jest.fn()
    }))
  };
});

describe("IntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      expect(intColumn).toHaveProperty("name", "age");
      expect(intColumn).toHaveProperty("options", {
        type: IntColumnTypeEnum.INT,
        nullable: true,
        default: undefined,
        unsigned: false,
        autoIncrement: false,
        zeroFill: false,
        primaryKey: false,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct definition", async () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      const definition = intColumn.getColumnDefinition().get();
      expect(definition).toEqual("`age` INT NULL AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      const definition = intColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns the correct definition", async () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn", index: true });
      const definition = intColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`age`)");
    });
    
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      await intColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("age");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      await intColumn.create(mockConnection, "testTable", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("age");
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
        query: "CREATE TABLE `test_table` (`age` INT NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "type override works correctly",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `age` MEDIUMINT NOT NULL;",
        options: {
          type: IntColumnTypeEnum.MEDIUMINT
        }
      },
      {
        name: "all options are set",
        createTable: true,
        query: "CREATE TABLE `test_table` (`age` MEDIUMINT NULL);",
        options: {
          type: IntColumnTypeEnum.MEDIUMINT,
          nullable: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `age` INT NOT NULL;",
        options: {
          type: IntColumnTypeEnum.INT,
          nullable: false
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const intColumn = new IntColumn("age", testCase.options);
        await intColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(Log.yellow).toHaveBeenCalledWith(testCase.warning);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
