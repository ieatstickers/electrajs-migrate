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
import { TableEncodingEnum } from "./Enum/TableEncodingEnum";
import { TableCollationEnum } from "./Enum/TableCollationEnum";
import { IndexDefinitionTypeEnum } from "../Definition/Enum/IndexDefinitionTypeEnum";
import { RenameColumnModification } from "../Modification/RenameColumn/RenameColumnModification";

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
      expect(table).toHaveProperty('columnAdditions', []);
      expect(table).toHaveProperty('columnModifications', []);
      expect(table).toHaveProperty('tableModifications', []);
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
      expect(table['columnAdditions'].length).toBe(1);
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

    it("adds a column addition that creates an int column and returns the table instance", async () => {
      const result = table.id();
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
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

    it("adds a column addition that creates an int column with the specified name and returns the table instance", async () => {
      const result = table.id("userId");
      expect(table['columnAdditions'].length).toBe(1);
      expect(result).toBe(table);
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
      expect(result).toBe(table);
      expect(IntColumn).toHaveBeenCalledWith("age", options);
      expect(table['columnAdditions'].length).toBe(1);
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
      expect(BlobColumn).toHaveBeenCalledWith("image", options);
    });

  });

  describe("renameColumn", () => {

    it("adds an operation that renames a column and returns the table instance", async () => {
      const result = table.renameColumn("oldName", "newName");
      expect(result).toBe(table);
      expect(table['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` RENAME COLUMN `oldName` TO `newName`;");
    });

  });

  describe("dropColumn", () => {

    it("adds an operation that drops a column and returns the table instance", async () => {
      const result = table.dropColumn("columnName");
      expect(result).toBe(table);
      expect(table['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP COLUMN `columnName`;");
    });

  });

  describe("addIndex", () => {

    it("adds an operation that adds an index to a column and returns the table instance", async () => {
      const result = table.addIndex(["columnName"]);
      expect(result).toBe(table);
      expect(table['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD INDEX `test_table_columnname_index` (`columnName`);");
    });
    
    it("adds type and name to index definition if provided", async () => {
      const result = table.addIndex(["columnName"], "test_index", IndexDefinitionTypeEnum.UNIQUE);
      expect(result).toBe(table);
      expect(table['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD UNIQUE INDEX `test_index` (`columnName`);");
    })

  });

  describe("dropIndex", () => {

    it("drops an index by name", async () => {
      const result = table.dropIndex("indexName");
      expect(table['columnModifications'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP INDEX `indexName`;");
    });

    it("handles array of column names correctly", async () => {
      const result = table.dropIndex(["columnName", "anotherColumnName"]);
      expect(table['columnModifications'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP INDEX `test_table_anothercolumnname_columnname_index`;");
    });

  });

  describe("setNullable", () => {

    it("adds an operation that sets a column to nullable and returns the table instance when set to true", async () => {
      const result = table.setNullable("columnName", true);
      expect(result).toBe(table);
      expect(result['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` NULL;");
    });

    it("adds an operation that sets a column to not nullable and returns the table instance when set to false", async () => {
      const result = table.setNullable("columnName", false);
      expect(result).toBe(table);
      expect(result['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` NOT NULL;");
    });

  });

  describe("setDefault", () => {

    it("adds an operation that sets a column default non-string value and returns the table instance", async () => {
      const intResult = table.setDefault("columnName", 0);
      expect(intResult).toBe(table);
      expect(intResult['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query)
        .toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` DEFAULT 0;");
    });

    it("adds an operation that sets a column default string value and returns the table instance", async () => {
      const intResult = table.setDefault("columnName", 'test');
      expect(intResult).toBe(table);
      expect(intResult['columnModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query)
        .toHaveBeenCalledWith("ALTER TABLE `test_table` MODIFY COLUMN `columnName` DEFAULT 'test';");
    });

  });

  describe("drop", () => {

    it("drop method adds an operation that drops the table and returns the table instance", async () => {
      const result = table.drop();
      expect(result).toBe(table);
      expect(result['tableModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("DROP TABLE IF EXISTS `test_table`;");
    });

  });
  
  describe("getDefaultIndexName", () => {
    
    it("returns the default index name", () => {
      expect(table['getDefaultIndexName']("columnName")).toBe("test_table_columnname_index");
    });
    
    it("sorts columns if multiple are provided", () => {
      expect(table['getDefaultIndexName']("three", "two", "one")).toBe("test_table_one_three_two_index");
    });
    
  });
  
  describe("getCreateTableQuery", () => {
  
    it("returns the create table query", () => {
      const columnAdditions = [
        new IntColumn("age"),
        new StringColumn("name"),
        new DecimalColumn("balance")
      ];
      const result = table['getCreateTableQuery'](columnAdditions, {});
      expect(result).toBe("CREATE TABLE `test_table` (`age` INT, `name` VARCHAR(255), `balance` DECIMAL(10, 2), INDEX `test_table_age_index` (`age`), INDEX `test_table_name_index` (`name`));");
    });
    
    it("returns the create table query with table options", () => {
      const columnAdditions = [
        new IntColumn("age"),
        new StringColumn("name")
      ];
      const result = table['getCreateTableQuery'](columnAdditions, {
        encoding:  TableEncodingEnum.UTF8MB4,
        collation: TableCollationEnum.UTF8MB4_GENERAL_CI
      });
      expect(result).toBe("CREATE TABLE `test_table` (`age` INT, `name` VARCHAR(255), INDEX `test_table_age_index` (`age`), INDEX `test_table_name_index` (`name`)) DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;");
    });
  
  });
  
  describe("getAlterTableQuery", () => {
    
    it("returns the alter table query", () => {
      const columnAdditions = [
        new IntColumn("age"),
        new StringColumn("name")
      ];
      const columnModifications = [
        new RenameColumnModification("oldName", "newName")
      ];
      const result = table['getAlterTableQuery'](columnAdditions, columnModifications);
      expect(result).toBe("ALTER TABLE `test_table` ADD COLUMN `age` INT, ADD COLUMN `name` VARCHAR(255), ADD INDEX `test_table_age_index` (`age`), ADD INDEX `test_table_name_index` (`name`), RENAME COLUMN `oldName` TO `newName`;");
    });
    
    it("correctly handles no additions or modifications", () => {
      const result = table['getAlterTableQuery']([], []);
      expect(result).toBe(null);
    });
    
  });
  
  
});
