import { Connection } from "../../Database/Connection";
import { EnumColumn } from "./EnumColumn";
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

describe("EnumColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(enumColumn).toHaveProperty("name", "status");
      expect(enumColumn).toHaveProperty("options", {
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
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      await enumColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("status");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const dateColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      await dateColumn.create(mockConnection, "test_table", false);
      expect(mockConnection.escape).toHaveBeenCalledWith("status");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("ALTER TABLE"));
    });
    
    it("throws error when invalid values are passed", () => {
      expect(() => new EnumColumn("status", [ "active", "" ]))
        .toThrow("Invalid EnumColumn values. Array item failed validation. Value must be at least 1 in length - string of length 0 provided");
    });
    
    it("throws error when invalid options are passed", () => {
      expect(() => new EnumColumn("status", [ "active", "inactive" ], { default: "invalid" }))
        .toThrow("Invalid EnumColumn options. default does not match schema definition. Value must be active or inactive - \"invalid\" provided");
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
        query: "CREATE TABLE `test_table` (`status` ENUM('active', 'inactive') NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set but table doesn't exist",
        createTable: true,
        query: "CREATE TABLE `test_table` (`status` ENUM('active', 'inactive') NULL DEFAULT 'active' INDEX);",
        options: {
          nullable: true,
          default: "active",
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "all options are set and table already exist",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `status` ENUM('active', 'inactive') NULL DEFAULT 'inactive' INDEX AFTER `afterColumnName`;",
        options: {
          nullable: true,
          default: "inactive",
          index: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `status` ENUM('active', 'inactive') NOT NULL;",
        options: {
          nullable: false
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const enumColumn = new EnumColumn("status", [ "active", "inactive" ], testCase.options);
        await enumColumn.create(mockConnection, "test_table", testCase.createTable);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
