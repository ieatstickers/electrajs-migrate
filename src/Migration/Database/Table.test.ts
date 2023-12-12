import { Table } from "./Table";
import { Connection } from "./Connection";
import { IntColumn } from "../Column/Int/IntColumn";
import { IntColumnTypeEnum } from "../Column/Int/IntColumnTypeEnum";
import { DecimalColumn } from "../Column/Decimal/DecimalColumn";
import { StringColumn } from "../Column/String/StringColumn";
import { EnumColumn } from "../Column/Enum/EnumColumn";
import { DateColumn } from "../Column/Date/DateColumn";
import { TimeColumn } from "../Column/Time/TimeColumn";
import { DateTimeColumn } from "../Column/DateTime/DateTimeColumn";
import { BlobColumn } from "../Column/Blob/BlobColumn";

jest.mock("./Connection", () => {
  return {
    Connection: jest.fn().mockImplementation(() => {
      return {
        query:  jest.fn().mockImplementation(() => Promise.resolve()),
        escape: jest.fn().mockImplementation((value) => `\`${value}\``)
      };
    })
  };
});
jest.mock("../Column/Int/IntColumn");
jest.mock("../Column/Decimal/DecimalColumn");
jest.mock("../Column/String/StringColumn");
jest.mock("../Column/Enum/EnumColumn");
jest.mock("../Column/Date/DateColumn");
jest.mock("../Column/Time/TimeColumn");
jest.mock("../Column/DateTime/DateTimeColumn");
jest.mock("../Column/Blob/BlobColumn");

describe("Table", () => {
  let mockConnection: Connection;
  let operations: Array<() => Promise<void>>;
  let table: Table;
  
  beforeEach(() => {
    mockConnection = new Connection({} as any);
    operations = [];
    table = new Table("test_table", mockConnection, operations, false);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  
  describe("constructor", () => {
    
    it("correctly initializes properties", () => {
      expect(table).toHaveProperty("name", "test_table");
      expect(table).toHaveProperty("connection", mockConnection);
      expect(table).toHaveProperty("operations", operations);
      expect(table).toHaveProperty("tableExists", false);
    });
    
  });
  
  describe("id", () => {
    
    it("adds an operation that creates an int column and returns the table instance", async () => {
      const result = table.id();
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(IntColumn).toHaveBeenCalledWith("id", {
        autoIncrement: true,
        default:       undefined,
        index:         false,
        nullable:      false,
        primaryKey:    true,
        type:          IntColumnTypeEnum.INT,
        unsigned:      false,
        zeroFill:      false
      });
      expect(IntColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
    it("adds an operation that creates an int column with the specified name and returns the table instance", async () => {
      const result = table.id("userId");
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(IntColumn).toHaveBeenCalledWith("userId", {
        autoIncrement: true,
        default:       undefined,
        index:         false,
        nullable:      false,
        primaryKey:    true,
        type:          IntColumnTypeEnum.INT,
        unsigned:      false,
        zeroFill:      false
      });
      expect(IntColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
  
  });
  
  describe("int", () => {
    
    it("adds an operation that creates an int column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.int("age", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(IntColumn).toHaveBeenCalledWith("age", options);
      expect(IntColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
  
  });
  
  describe("decimal", () => {
    
    it("adds an operation that creates a decimal column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.decimal("balance", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DecimalColumn).toHaveBeenCalledWith("balance", options);
      expect(DecimalColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("string", () => {
    
    it("adds an operation that creates a string column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.string("name", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(StringColumn).toHaveBeenCalledWith("name", options);
      expect(StringColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("enum", () => {
    
    it("adds an operation that creates an enum column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.enum("status", [ "active", "inactive" ], options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(EnumColumn).toHaveBeenCalledWith("status", [ "active", "inactive" ], options);
      expect(EnumColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("date", () => {
    
    it("adds an operation that creates a date column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.date("dateOfBirth", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DateColumn).toHaveBeenCalledWith("dateOfBirth", options);
      expect(DateColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("time", () => {
    
    it("adds an operation that creates a time column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.time("startTime", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(TimeColumn).toHaveBeenCalledWith("startTime", options);
      expect(TimeColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("datetime", () => {
    
    it("adds an operation that creates a datetime column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.datetime("created", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DateTimeColumn).toHaveBeenCalledWith("created", options);
      expect(DateTimeColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("blob", () => {
    
    it("adds an operation that creates a blob column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.blob("image", options);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(BlobColumn).toHaveBeenCalledWith("image", options);
      expect(BlobColumn.prototype.create).toHaveBeenCalledWith(mockConnection, "test_table", true);
    });
    
  });
  
  describe("renameColumn", () => {
    
    test("adds an operation that renames a column and returns the table instance", async () => {
      const result = table.renameColumn("oldName", "newName");
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` RENAME COLUMN `oldName` TO `newName`;");
    });
    
  });
  
  describe("dropColumn", () => {
    
    it("adds an operation that drops a column and returns the table instance", async () => {
      const result = table.dropColumn("columnName");
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP COLUMN `columnName`;");
    });
    
  });
  
  describe("addColumnIndex", () => {
    
    test("adds an operation that adds an index to a column and returns the table instance", async () => {
      const result = table.addColumnIndex("columnName");
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD INDEX `columnName`;");
    });
    
  });
  
  describe("dropColumnIndex", () => {
    
    it("adds an operation that drops an index from a column and returns the table instance", async () => {
      const result = table.dropColumnIndex("columnName");
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP INDEX `columnName`;");
    });
    
  });
  
  describe("setColumnNullable", () => {
    
    it("adds an operation that sets a column to nullable and returns the table instance when set to true", async () => {
      const result = table.setColumnNullable("columnName", true);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` NULL;");
    });
    
    it("adds an operation that sets a column to not nullable and returns the table instance when set to false", async () => {
      const result = table.setColumnNullable("columnName", false);
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` NOT NULL;");
    });
    
  });
  
  describe("setColumnDefault", () => {
    
    it("adds an operation that sets a column default non-string value and returns the table instance", async () => {
      const intResult = table.setColumnDefault("columnName", 0);
      expect(operations.length).toBe(1);
      expect(intResult).toBe(table);
      await operations[0]();
      expect(mockConnection.query)
        .toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` DEFAULT 0;");
    });
    
    it("adds an operation that sets a column default string value and returns the table instance", async () => {
      const intResult = table.setColumnDefault("columnName", 'test');
      expect(operations.length).toBe(1);
      expect(intResult).toBe(table);
      await operations[0]();
      expect(mockConnection.query)
        .toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` DEFAULT 'test';");
    });
    
  });
  
  describe("drop", () => {
    
    test("drop method adds an operation that drops the table and returns the table instance", async () => {
      const result = table.drop();
      expect(operations.length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("DROP TABLE `test_table`;");
    });
    
  });
  
});
