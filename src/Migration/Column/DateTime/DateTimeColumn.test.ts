import { Connection } from "../../Database/Connection";
import { DateTimeColumn } from "./DateTimeColumn";
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

describe("DateTimeColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      expect(datetimeColumn).toHaveProperty("name", "created");
      expect(datetimeColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct definition when nullable is true", async () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NULL AFTER `otherColumn`");
    });
    
    it("returns correct definition when nullable is false", async () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: false, addAfter: "otherColumn" });
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NOT NULL AFTER `otherColumn`");
    });
    
    it("returns correct definition when default is set", async () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, default: "2020-01-01 00:00:00", addAfter: "otherColumn" });
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NULL DEFAULT '2020-01-01 00:00:00' AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      const definition = datetimeColumn.getIndexDefinition();
      expect(definition).toEqual(null);
      
    });
    
    it("returns correct definition when index is true", async () => {
      
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, index: true, addAfter: "otherColumn" });
      const definition = datetimeColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`created`)");
      
    });
    
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const dateColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      await dateColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("created");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const dateColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      await dateColumn.create(mockConnection, "test_table", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("created");
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
        query: "CREATE TABLE `test_table` (`created` DATETIME NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set but table doesn't exist",
        createTable: true,
        query: "CREATE TABLE `test_table` (`created` DATETIME NULL DEFAULT '2020-01-01 00:00:00'), ADD INDEX (`created`);",
        options: {
          nullable: true,
          default: "2020-01-01 00:00:00",
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set and table already exist",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `created` DATETIME NULL DEFAULT '2020-01-01 00:00:00' AFTER `afterColumnName`, ADD INDEX (`created`);",
        options: {
          nullable: true,
          default: "2020-01-01 00:00:00",
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `created` DATETIME NOT NULL;",
        options: {
          nullable: false
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const datetimeColumn = new DateTimeColumn("created", testCase.options);
        await datetimeColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(Log.yellow).toHaveBeenCalledWith(testCase.warning);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
