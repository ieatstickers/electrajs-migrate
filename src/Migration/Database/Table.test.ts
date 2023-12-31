import { Table } from "./Table";
import { Connection } from "./Connection";
import { IntColumn } from "../Column/Int/IntColumn";
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
import { TinyIntColumn } from "../Column/Int/TinyIntColumn";
import { SmallIntColumn } from "../Column/Int/SmallIntColumn";
import { MediumIntColumn } from "../Column/Int/MediumIntColumn";
import { BigIntColumn } from "../Column/Int/BigIntColumn";
import { TinyBlobColumn } from "../Column/Blob/TinyBlobColumn";
import { MediumBlobColumn } from "../Column/Blob/MediumBlobColumn";
import { LongBlobColumn } from "../Column/Blob/LongBlobColumn";
import { TextColumn } from "../Column/Text/TextColumn";
import { TinyTextColumn } from "../Column/Text/TinyTextColumn";
import { MediumTextColumn } from "../Column/Text/MediumTextColumn";
import { LongTextColumn } from "../Column/Text/LongTextColumn";

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
          get: jest.fn().mockReturnValue("`age` INT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_age_index` (`age`)"),
          isDrop: jest.fn().mockReturnValue(false)
        }),
        unsigned: jest.fn().mockReturnThis(),
        nullable: jest.fn().mockReturnThis(),
        primaryKey: jest.fn().mockReturnThis(),
        autoIncrement: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Int/TinyIntColumn", () => {
  return {
    TinyIntColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("age"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`age` TINYINT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_age_index` (`age`)"),
          isDrop: jest.fn().mockReturnValue(false)
        }),
        unsigned: jest.fn().mockReturnThis(),
        nullable: jest.fn().mockReturnThis(),
        primaryKey: jest.fn().mockReturnThis(),
        autoIncrement: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Int/SmallIntColumn", () => {
  return {
    SmallIntColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("age"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`age` SMALLINT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_age_index` (`age`)"),
          isDrop: jest.fn().mockReturnValue(true)
        }),
        unsigned: jest.fn().mockReturnThis(),
        nullable: jest.fn().mockReturnThis(),
        primaryKey: jest.fn().mockReturnThis(),
        autoIncrement: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(true)
      };
    })
  };
});

jest.mock("../Column/Int/MediumIntColumn", () => {
  return {
    MediumIntColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("age"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`age` MEDIUMINT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_age_index` (`age`)"),
          isDrop: jest.fn().mockReturnValue(false)
        }),
        unsigned: jest.fn().mockReturnThis(),
        nullable: jest.fn().mockReturnThis(),
        primaryKey: jest.fn().mockReturnThis(),
        autoIncrement: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Int/BigIntColumn", () => {
  return {
    BigIntColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("age"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`age` BIGINT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_age_index` (`age`)"),
          isDrop: jest.fn().mockReturnValue(false)
        }),
        unsigned: jest.fn().mockReturnThis(),
        nullable: jest.fn().mockReturnThis(),
        primaryKey: jest.fn().mockReturnThis(),
        autoIncrement: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
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
          get: jest.fn().mockReturnValue("`balance` DECIMAL(10, 2)"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false),
        isDrop: jest.fn().mockReturnValue(false)
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
          get: jest.fn().mockReturnValue("`balance` DOUBLE"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
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
          get: jest.fn().mockReturnValue("`name` VARCHAR(255)"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue({
          defaultName: jest.fn().mockReturnThis(),
          get: jest.fn().mockReturnValue("INDEX `test_table_name_index` (`name`)"),
          isDrop: jest.fn().mockReturnValue(false)
        }),
        nullable: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false),
        update: jest.fn().mockReturnThis()
      };
    })
  };
});

jest.mock("../Column/Text/TextColumn", () => {
  return {
    TextColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("name"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`name` TEXT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Text/TinyTextColumn", () => {
  return {
    TinyTextColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("name"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`name` TINYTEXT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Text/MediumTextColumn", () => {
  return {
    MediumTextColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("name"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`name` MEDIUMTEXT"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
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
          get: jest.fn().mockReturnValue("`status` ENUM('active', 'inactive')"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
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
          get: jest.fn().mockReturnValue("`dateOfBirth` DATE"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        update: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(true),
        hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
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
          get: jest.fn().mockReturnValue("`start` TIME"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
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
          get: jest.fn().mockReturnValue("`created` DATETIME"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(true)
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
          get: jest.fn().mockReturnValue("`imageContent` BLOB"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Blob/TinyBlobColumn", () => {
  return {
    TinyBlobColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("imageContent"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`imageContent` TINYBLOB"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Blob/MediumBlobColumn", () => {
  return {
    MediumBlobColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("imageContent"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`imageContent` MEDIUMBLOB"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
      };
    })
  };
});

jest.mock("../Column/Blob/LongBlobColumn", () => {
  return {
    LongBlobColumn: jest.fn().mockImplementation(() => {
      return {
        getName: jest.fn().mockReturnValue("imageContent"),
        getColumnDefinition: jest.fn().mockReturnValue({
          get: jest.fn().mockReturnValue("`imageContent` LONGBLOB"),
          hydrateExistingOptions: jest.fn().mockResolvedValue(undefined)
        }),
        getIndexDefinition: jest.fn().mockReturnValue(null),
        nullable: jest.fn().mockReturnThis(),
        exists: jest.fn().mockReturnValue(false)
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
      expect(table).toHaveProperty('columns', []);
      expect(table).toHaveProperty('standaloneModifications', []);
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
      table.double("balance");
      expect(table['columns'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD COLUMN `balance` DOUBLE;");
    });

    it("default operation adds column to existing table", async () => {
      const operations = [];
      table = new Table("test_table", mockConnection, operations, true);
      table.int("age");
      table.string("name");
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD COLUMN `age` INT, ADD COLUMN `name` VARCHAR(255), ADD INDEX `test_table_age_index` (`age`), ADD INDEX `test_table_name_index` (`name`);");
    });
    
    it("correctly sorts columns to add and columns to modify", async () => {
      const operations = [];
      table = new Table("test_table", mockConnection, operations, true);
      jest.spyOn(table, 'getAlterTableQuery' as any);
      const intColumn = new IntColumn("intColumn");
      const existingColumn = (new DateColumn("exisingColumn")).index().update();
      table['columns'].push(intColumn, existingColumn);
      await operations[0]();
      expect(table['getAlterTableQuery']).toHaveBeenCalledWith([ intColumn ], [ existingColumn ], []);
    });
    
  });
  
  describe("id", () => {

    it("adds an int column and returns it", async () => {
      const result = table.id();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(result.unsigned).toHaveBeenCalledTimes(1);
      expect(result.autoIncrement).toHaveBeenCalledTimes(1);
      expect(result.primaryKey).toHaveBeenCalledTimes(1);
      expect(IntColumn).toHaveBeenCalledWith("id");
    });

    it("adds an int column with the specified name and returns it", async () => {
      const result = table.id("userId");
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(IntColumn).toHaveBeenCalledWith("userId");
    });

  });

  describe("int", () => {

    it("adds an int column and returns it", async () => {
      const result = table.int("age").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(IntColumn).toHaveBeenCalledWith("age");
    });

  });

  describe("tinyint", () => {

    it("adds an tinyint column and returns it", async () => {
      const result = table.tinyint("age").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(TinyIntColumn).toHaveBeenCalledWith("age");
    });

  });

  describe("smallint", () => {

    it("adds an smallint column and returns it", async () => {
      const result = table.smallint("age").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(SmallIntColumn).toHaveBeenCalledWith("age");
    });

  });

  describe("mediumint", () => {

    it("adds an mediumint column and returns it", async () => {
      const result = table.mediumint("age").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(MediumIntColumn).toHaveBeenCalledWith("age");
    });

  });

  describe("bigint", () => {

    it("adds an bigint column and returns it", async () => {
      const result = table.bigint("age").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(BigIntColumn).toHaveBeenCalledWith("age");
    });

  });

  describe("decimal", () => {

    it("adds a decimal column and returns it", async () => {
      const result = table.decimal("balance").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(DecimalColumn).toHaveBeenCalledWith("balance", 8, 2);
    });

  });

  describe("double", () => {

    it("adds a double column and returns it", async () => {
      const result = table.double("balance").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(DoubleColumn).toHaveBeenCalledWith("balance", undefined, undefined);
    });

    it("adds a double column with precision and scale", async () => {
      const result = table.double("balance", 10, 2).nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(DoubleColumn).toHaveBeenCalledWith("balance", 10, 2);
    });

  });

  describe("string", () => {

    it("adds a string column and returns it", async () => {
      const result = table.string("name").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(StringColumn).toHaveBeenCalledWith("name", 255);
    });

    it("adds a string column with length and returns it", async () => {
      const result = table.string("name", 200).nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(StringColumn).toHaveBeenCalledWith("name", 200);
    });

  });

  describe("text", () => {

    it("adds a text column and returns it", async () => {
      const result = table.text("name").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(TextColumn).toHaveBeenCalledWith("name");
    });

  });

  describe("tinytext", () => {

    it("adds a tinytext column and returns it", async () => {
      const result = table.tinytext("name").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(TinyTextColumn).toHaveBeenCalledWith("name");
    });

  });

  describe("mediumtext", () => {

    it("adds a mediumtext column and returns it", async () => {
      const result = table.mediumtext("name").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(MediumTextColumn).toHaveBeenCalledWith("name");
    });

  });

  describe("longtext", () => {

    it("adds a longtext column and returns it", async () => {
      const result = table.longtext("name").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(LongTextColumn).toHaveBeenCalledWith("name");
    });

  });

  describe("enum", () => {

    it("adds an enum column and it", async () => {
      const result = table.enum("status", [ "active", "inactive" ]).nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(EnumColumn).toHaveBeenCalledWith("status", [ "active", "inactive" ]);
    });

  });

  describe("date", () => {

    it("adds a date column and returns it", async () => {
      const result = table.date("dateOfBirth").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(DateColumn).toHaveBeenCalledWith("dateOfBirth");
    });

  });

  describe("time", () => {

    it("adds a time column and returns it", async () => {
      const result = table.time("startTime").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(TimeColumn).toHaveBeenCalledWith("startTime");
    });

  });

  describe("datetime", () => {

    it("adds a datetime column and returns it", async () => {
      const result = table.datetime("created").nullable().index();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(DateTimeColumn).toHaveBeenCalledWith("created");
    });

  });

  describe("blob", () => {

    it("adds a blob column and returns it", async () => {
      const result = table.blob("image").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(BlobColumn).toHaveBeenCalledWith("image");
    });

  });

  describe("tinyblob", () => {

    it("adds a tinyblob column and returns it", async () => {
      const result = table.tinyblob("image").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(TinyBlobColumn).toHaveBeenCalledWith("image");
    });

  });

  describe("mediumblob", () => {

    it("adds a tinyblob column and returns it", async () => {
      const result = table.mediumblob("image").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(MediumBlobColumn).toHaveBeenCalledWith("image");
    });

  });

  describe("longblob", () => {

    it("adds a longblob column and returns it", async () => {
      const result = table.longblob("image").nullable();
      expect(table['columns'].length).toBe(1);
      expect(result).toBe(table['columns'][0]);
      expect(LongBlobColumn).toHaveBeenCalledWith("image");
    });

  });

  describe("renameColumn", () => {

    it("adds an operation that renames a column and returns the table instance", async () => {
      const result = table.renameColumn("oldName", "newName");
      expect(result).toBe(table);
      expect(table['alterModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` RENAME COLUMN `oldName` TO `newName`;");
    });

  });

  describe("dropColumn", () => {

    it("adds an operation that drops a column and returns the table instance", async () => {
      const result = table.dropColumn("columnName");
      expect(result).toBe(table);
      expect(table['alterModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP COLUMN `columnName`;");
    });

  });

  describe("addIndex", () => {

    it("adds an operation that adds an index to a column and returns the table instance", async () => {
      const result = table.addIndex(["columnName"]);
      expect(result).toBe(table);
      expect(table['alterModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD INDEX `test_table_columnname_index` (`columnName`);");
    });

    it("adds type and name to index definition if provided", async () => {
      const result = table.addIndex(["columnName"], "test_index", IndexDefinitionTypeEnum.UNIQUE);
      expect(result).toBe(table);
      expect(table['alterModifications'].length).toBe(1);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` ADD UNIQUE INDEX `test_index` (`columnName`);");
    })

  });

  describe("dropIndex", () => {

    it("drops an index by name", async () => {
      const result = table.dropIndex("indexName");
      expect(table['alterModifications'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP INDEX `indexName`;");
    });

    it("handles array of column names correctly", async () => {
      const result = table.dropIndex(["columnName", "anotherColumnName"]);
      expect(table['alterModifications'].length).toBe(1);
      expect(result).toBe(table);
      await operations[0]();
      expect(mockConnection.query).toHaveBeenCalledWith("ALTER TABLE `test_table` DROP INDEX `test_table_anothercolumnname_columnname_index`;");
    });

  });

  describe("drop", () => {

    it("drop method adds an operation that drops the table and returns the table instance", async () => {
      const result = table.drop();
      expect(result).toBe(table);
      expect(result['standaloneModifications'].length).toBe(1);
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
      const columns = [
        new IntColumn("age"),
        new StringColumn("name"),
        new DecimalColumn("balance")
      ];
      const result = table['getCreateTableQuery'](columns, {});
      expect(result).toBe("CREATE TABLE `test_table` (`age` INT, `name` VARCHAR(255), `balance` DECIMAL(10, 2), INDEX `test_table_age_index` (`age`), INDEX `test_table_name_index` (`name`));");
    });
    
    it("returns the create table query with table options", () => {
      const columns = [
        new IntColumn("age"),
        new StringColumn("name")
      ];
      const result = table['getCreateTableQuery'](columns, {
        encoding:  TableEncodingEnum.UTF8MB4,
        collation: TableCollationEnum.UTF8MB4_GENERAL_CI
      });
      expect(result).toBe("CREATE TABLE `test_table` (`age` INT, `name` VARCHAR(255), INDEX `test_table_age_index` (`age`), INDEX `test_table_name_index` (`name`)) DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;");
    });
  
  });
  
  describe("getAlterTableQuery", () => {
    
    it("returns the alter table query", () => {
      const columns = [
        new IntColumn("age"),
        new StringColumn("name")
      ];
      const columnModifications = [
        (new StringColumn("test"))
      ];
      const alterModifications = [
        new RenameColumnModification("oldName", "newName")
      ];
      const result = table['getAlterTableQuery'](columns, columnModifications, alterModifications);
      expect(result).toBe("ALTER TABLE `test_table` ADD COLUMN `age` INT, ADD COLUMN `name` VARCHAR(255), ADD INDEX `test_table_age_index` (`age`), ADD INDEX `test_table_name_index` (`name`), ADD INDEX `test_table_name_index` (`name`), MODIFY COLUMN `name` VARCHAR(255), RENAME COLUMN `oldName` TO `newName`;");
    });
    
    it("correctly handles no additions or modifications", () => {
      const result = table['getAlterTableQuery']([], [], []);
      expect(result).toBe(null);
    });
    
    it("correctly handles dropping indexes", () => {
      const result = table['getAlterTableQuery']([], [new SmallIntColumn('name')], []);
      expect(result).toBe("ALTER TABLE `test_table` DROP INDEX `test_table_age_index` (`age`), MODIFY COLUMN `age` SMALLINT;");
    });
    
  });
  
  
});
