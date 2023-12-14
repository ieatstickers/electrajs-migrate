import { Connection } from "../../Database/Connection";
import { DateColumn } from "./DateColumn";
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

describe("DateColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn" });
      expect(dateColumn).toHaveProperty("name", "dateOfBirth");
      expect(dateColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn" });
      await dateColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("dateOfBirth");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn" });
      await dateColumn.create(mockConnection, "test_table", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("dateOfBirth");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
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
        query: "CREATE TABLE `test_table` (`dateOfBirth` DATE NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set but table doesn't exist",
        createTable: true,
        query: "CREATE TABLE `test_table` (`dateOfBirth` DATE NULL DEFAULT '2020-01-01' INDEX);",
        options: {
          nullable: true,
          default: "2020-01-01",
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set and table already exist",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `dateOfBirth` DATE NULL DEFAULT '2020-01-01' INDEX AFTER `afterColumnName`;",
        options: {
          nullable: true,
          default: "2020-01-01",
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `dateOfBirth` DATE NOT NULL;",
        options: {
          nullable: false
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const dateColumn = new DateColumn("dateOfBirth", testCase.options);
        await dateColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(Log.yellow).toHaveBeenCalledWith(testCase.warning);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
