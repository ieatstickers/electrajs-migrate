import { Connection } from "../../Database/Connection";
import { DecimalColumn } from "./DecimalColumn";
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

describe("DecimalColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn" });
      expect(decimalColumn).toHaveProperty("name", "balance");
      expect(decimalColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn",
        precision: 10,
        scale: 2,
        unsigned: false,
        zeroFill: false
      });
    });
    
  });
  
  describe("getDefinition", () => {
  
    it("returns correct column definition", async () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn" });
      const definition = await decimalColumn.getDefinition();
      expect(definition).toEqual("`balance` DECIMAL(10, 2) NULL AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a default", async () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn", default: 0.00 });
      const definition = await decimalColumn.getDefinition();
      expect(definition).toEqual("`balance` DECIMAL(10, 2) NULL DEFAULT 0.00 AFTER `otherColumn`");
    });
  
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn" });
      await decimalColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("balance");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const dateColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn" });
      await dateColumn.create(mockConnection, "test_table", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("balance");
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
        query: "CREATE TABLE `test_table` (`balance` DECIMAL(10, 2) NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set but table doesn't exist",
        createTable: true,
        query: "CREATE TABLE `test_table` (`balance` DECIMAL(10, 2) NULL DEFAULT 0.00), ADD INDEX (`balance`);",
        options: {
          nullable: true,
          default: 0.00,
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set and table already exist",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `balance` DECIMAL(10, 2) NULL DEFAULT 0.00 AFTER `afterColumnName`, ADD INDEX (`balance`);",
        options: {
          nullable: true,
          default: 0.00,
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `balance` DECIMAL(10, 2) NOT NULL;",
        options: {
          nullable: false
        }
      },
      {
        name: "precision and scale correctly overridden",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `balance` DECIMAL(5, 3) NOT NULL DEFAULT 0.000;",
        options: {
          precision: 5,
          scale: 3,
          default: 0
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const decimalColumn = new DecimalColumn("balance", testCase.options);
        await decimalColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(Log.yellow).toHaveBeenCalledWith(testCase.warning);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
