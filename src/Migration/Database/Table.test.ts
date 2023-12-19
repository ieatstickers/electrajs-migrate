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
import { DoubleColumn } from "../Column/Double/DoubleColumn";

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
jest.mock("../Column/Int/IntColumn", () => {
  return {
    IntColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("age"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`age` INT")
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_age_index` (`age`)")
        }),
      };
    })
  };
});
jest.mock("../Column/Decimal/DecimalColumn", () => {
  return {
    DecimalColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("balance"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`balance` DECIMAL(10, 2)")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});
jest.mock("../Column/Double/DoubleColumn", () => {
  return {
    DoubleColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("balance"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`balance` DECIMAL")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});
jest.mock("../Column/String/StringColumn", () => {
  return {
    StringColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("name"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`name` VARCHAR(255)")
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_name_index` (`name`)")
        }),
      };
    })
  };
});
jest.mock("../Column/Enum/EnumColumn", () => {
  return {
    EnumColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("status"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`status` ENUM('active', 'inactive')")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});
jest.mock("../Column/Date/DateColumn", () => {
  return {
    DateColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("dateOfBirth"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`dateOfBirth` DATE")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});
jest.mock("../Column/Time/TimeColumn", () => {
  return {
    TimeColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("start"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`start` TIME")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});
jest.mock("../Column/DateTime/DateTimeColumn", () => {
  return {
    DateTimeColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("created"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`created` DATETIME")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});
jest.mock("../Column/Blob/BlobColumn", () => {
  return {
    BlobColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("imageContent"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`imageContent` BLOB")
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
      };
    })
  };
});

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
      expect(operations.length).toBe(1);
    });
    
    it("default operation does nothing if no columns to add", async () => {
      await operations[0]();
      expect(mockConnection.query).not.toHaveBeenCalled();
    });
    
    it("default operation creates table if no table exists and columns to add", async () => {
      table.int("age");
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("CREATE TABLE `test_table` (`age` INT, INDEX `test_table_age_index` (`age`)) DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;");
    });
    
    it("does not add indexes if none set", async () => {
      const operations = [];
      const table = new Table("test_table", mockConnection, operations, true);
      table.date("dateOfBirth");
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD COLUMN `dateOfBirth` DATE;");
    });
    
    it("default operation adds column to existing table", async () => {
      const operations = [];
      table = new Table("test_table", mockConnection, operations, true);
      table
        .int("age")
        .string("name");
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD COLUMN `age` INT, ADD COLUMN `name` VARCHAR(255), ADD INDEX `test_table_age_index` (`age`), ADD INDEX `test_table_name_index` (`name`);");
    });
    
  });
  
  describe("id", () => {
    
    it("adds an operation that creates an int column and returns the table instance", async () => {
      const result = table.id();
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(IntColumn).toHaveBeenCalledWith("id", {
        autoIncrement: true,
        default:       undefined,
        index:         false,
        nullable:      false,
        primaryKey:    true,
        type:          IntColumnTypeEnum.INT,
        unsigned:      true,
        zeroFill:      false
      });
    });
    
    it("adds an operation that creates an int column with the specified name and returns the table instance", async () => {
      const result = table.id("userId");
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(IntColumn).toHaveBeenCalledWith("userId", {
        autoIncrement: true,
        default:       undefined,
        index:         false,
        nullable:      false,
        primaryKey:    true,
        type:          IntColumnTypeEnum.INT,
        unsigned:      true,
        zeroFill:      false
      });
    });
  
  });
  
  describe("int", () => {
    
    it("adds an operation that creates an int column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.int("age", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(IntColumn).toHaveBeenCalledWith("age", options);
    });
  
  });
  
  describe("decimal", () => {
    
    it("adds an operation that creates a decimal column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.decimal("balance", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DecimalColumn).toHaveBeenCalledWith("balance", options);
    });
    
  });
  
  describe("double", () => {
    
    it("adds an operation that creates a double column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.double("balance", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DoubleColumn).toHaveBeenCalledWith("balance", options);
    });
    
  });
  
  describe("string", () => {
    
    it("adds an operation that creates a string column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.string("name", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(StringColumn).toHaveBeenCalledWith("name", options);
    });
    
  });
  
  describe("enum", () => {
    
    it("adds an operation that creates an enum column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.enum("status", [ "active", "inactive" ], options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(EnumColumn).toHaveBeenCalledWith("status", [ "active", "inactive" ], options);
    });
    
  });
  
  describe("date", () => {
    
    it("adds an operation that creates a date column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.date("dateOfBirth", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DateColumn).toHaveBeenCalledWith("dateOfBirth", options);
    });
    
  });
  
  describe("time", () => {
    
    it("adds an operation that creates a time column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.time("startTime", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(TimeColumn).toHaveBeenCalledWith("startTime", options);
    });
    
  });
  
  describe("datetime", () => {
    
    it("adds an operation that creates a datetime column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.datetime("created", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(DateTimeColumn).toHaveBeenCalledWith("created", options);
    });
    
  });
  
  describe("blob", () => {
    
    it("adds an operation that creates a blob column and returns the table instance", async () => {
      const options = {
        nullable: true,
        index:    true
      };
      const result = table.blob("image", options);
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(BlobColumn).toHaveBeenCalledWith("image", options);
    });
    
  });
  
  describe("renameColumn", () => {
    
    test("adds an operation that renames a column and returns the table instance", async () => {
      const result = table.renameColumn("oldName", "newName");
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` RENAME COLUMN `oldName` TO `newName`;");
    });
    
  });
  
  describe("dropColumn", () => {
    
    it("adds an operation that drops a column and returns the table instance", async () => {
      const result = table.dropColumn("columnName");
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP COLUMN `columnName`;");
    });
    
  });
  
  describe("addColumnIndex", () => {
    
    test("adds an operation that adds an index to a column and returns the table instance", async () => {
      const result = table.addColumnIndex("columnName");
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD INDEX `columnName`;");
    });
    
  });
  
  describe("dropColumnIndex", () => {
    
    it("adds an operation that drops an index from a column and returns the table instance", async () => {
      const result = table.dropColumnIndex("columnName");
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP INDEX `columnName`;");
    });
    
  });
  
  describe("setColumnNullable", () => {
    
    it("adds an operation that sets a column to nullable and returns the table instance when set to true", async () => {
      const result = table.setColumnNullable("columnName", true);
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` NULL;");
    });
    
    it("adds an operation that sets a column to not nullable and returns the table instance when set to false", async () => {
      const result = table.setColumnNullable("columnName", false);
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` NOT NULL;");
    });
    
  });
  
  describe("setColumnDefault", () => {
    
    it("adds an operation that sets a column default non-string value and returns the table instance", async () => {
      const intResult = table.setColumnDefault("columnName", 0);
      expect(operations.length).toBe(2);
      expect(intResult).toBe(table);
      await operations[1]();
      expect(mockConnection.query)
        .toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` DEFAULT 0;");
    });
    
    it("adds an operation that sets a column default string value and returns the table instance", async () => {
      const intResult = table.setColumnDefault("columnName", 'test');
      expect(operations.length).toBe(2);
      expect(intResult).toBe(table);
      await operations[1]();
      expect(mockConnection.query)
        .toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` DEFAULT 'test';");
    });
    
  });
  
  describe("drop", () => {
    
    test("drop method adds an operation that drops the table and returns the table instance", async () => {
      const result = table.drop();
      expect(operations.length).toBe(2);
      expect(result).toBe(table);
      await operations[1]();
      expect(mockConnection.query).toHaveBeenCalledWith("DROP TABLE `test_table`;");
    });
    
  });
  
});
