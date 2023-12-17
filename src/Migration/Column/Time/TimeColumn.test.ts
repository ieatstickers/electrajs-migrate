import { Connection } from "../../Database/Connection";
import { TimeColumn } from "./TimeColumn";
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


describe("TimeColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const timeColumn = new TimeColumn("startTime", { nullable: true, addAfter: "otherColumn" });
      expect(timeColumn).toHaveProperty("name", "startTime");
      expect(timeColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getDefinition", () => {
    
    it("returns correct column definition", async () => {
      const timeColumn = new TimeColumn("startTime", { nullable: true, addAfter: "otherColumn" });
      const definition = await timeColumn.getDefinition();
      expect(definition).toEqual("`startTime` TIME NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition with default", async () => {
      const timeColumn = new TimeColumn("startTime", { nullable: true, default: "20:30:00", addAfter: "otherColumn" });
      const definition = await timeColumn.getDefinition();
      expect(definition).toEqual("`startTime` TIME NULL DEFAULT '20:30:00' AFTER `otherColumn`");
    });
    
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const timeColumn = new TimeColumn("startTime", { nullable: true, addAfter: "otherColumn" });
      await timeColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("startTime");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const timeColumn = new TimeColumn("startTime", { nullable: true, addAfter: "otherColumn" });
      await timeColumn.create(mockConnection, "test_table", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("startTime");
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
        query: "CREATE TABLE `test_table` (`startTime` TIME NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set but table doesn't exist",
        createTable: true,
        query: "CREATE TABLE `test_table` (`startTime` TIME NULL DEFAULT '20:30:00');",
        options: {
          nullable: true,
          default: "20:30:00",
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set and table already exist",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `startTime` TIME NULL DEFAULT '20:30:00' AFTER `afterColumnName`;",
        options: {
          nullable: true,
          default: "20:30:00",
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `startTime` TIME NOT NULL;",
        options: {
          nullable: false
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const timeColumn = new TimeColumn("startTime", testCase.options);
        await timeColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(Log.yellow).toHaveBeenCalledWith(testCase.warning);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
