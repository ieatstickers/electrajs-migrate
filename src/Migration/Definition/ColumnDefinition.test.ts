import { ColumnDefinition } from "./ColumnDefinition";

describe("ColumnDefinition", () => {
  
  describe("constructor", () => {
    
    it("correctly initialises definition", () => {
      const columnDefinition = new ColumnDefinition("name", "type");
      expect(columnDefinition).toHaveProperty("name", "name");
      expect(columnDefinition).toHaveProperty("type", "type");
    })
    
  });
  
  describe("create", () => {
    
    it("returns a new ColumnDefinition instance", () => {
      const columnDefinition = ColumnDefinition.create("name", "type");
      expect(columnDefinition).toBeInstanceOf(ColumnDefinition);
      expect(columnDefinition).toHaveProperty("name", "name");
      expect(columnDefinition).toHaveProperty("type", "type");
    });
    
  });
  
  describe("nullable", () => {
  
    it("adds NULL to the definition when nullable is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .nullable(true);
      expect(columnDefinition).toHaveProperty("options.nullable", true);
      expect(columnDefinition.get()).toEqual("`name` type NULL");
    });
    
    it("adds NOT NULL to the definition when nullable is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .nullable(false);
      expect(columnDefinition).toHaveProperty("options.nullable", false);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
    
  });
  

  describe("default", () => {
  
    it("adds DEFAULT value to the definition when value is provided", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .default("value");
      expect(columnDefinition).toHaveProperty("options.default", "value");
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL DEFAULT value");
    });
    
    it("does not add DEFAULT to the definition when value is undefined", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .default(undefined);
      expect(columnDefinition).toHaveProperty("options.default", undefined);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
  });
  
  describe("dropDefault", () => {
    
      it("does not add default to the definition when dropDefault is true", () => {
        const columnDefinition = ColumnDefinition
          .create("name", "type")
          .default('test')
          .dropDefault(true);
        expect(columnDefinition).toHaveProperty("options.dropDefault", true);
        expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
      });

  });
  
  describe("unsigned", () => {
  
    it("adds UNSIGNED to the definition when unsigned is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .unsigned(true);
      expect(columnDefinition).toHaveProperty("options.unsigned", true);
      expect(columnDefinition.get()).toEqual("`name` type UNSIGNED NOT NULL");
    });
    
    it("does not add UNSIGNED to the definition when unsigned is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .unsigned(false);
      expect(columnDefinition).toHaveProperty("options.unsigned", false);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
  });
  
  describe("autoIncrement", () => {
  
    it("adds AUTO_INCREMENT to the definition when autoIncrement is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .autoIncrement(true);
      expect(columnDefinition).toHaveProperty("options.autoIncrement", true);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL AUTO_INCREMENT");
    });
    
    it("does not add AUTO_INCREMENT to the definition when autoIncrement is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .autoIncrement(false);
      expect(columnDefinition).toHaveProperty("options.autoIncrement", false);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
  });
  
  describe("zeroFill", () => {
  
    it("adds ZEROFILL to the definition when zeroFill is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .zeroFill(true);
      expect(columnDefinition).toHaveProperty("options.zeroFill", true);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL ZEROFILL");
    });
    
    it("does not add ZEROFILL to the definition when zeroFill is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .zeroFill(false);
      expect(columnDefinition).toHaveProperty("options.zeroFill", false);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
  });
  
  describe("primaryKey", () => {
  
    it("adds PRIMARY KEY to the definition when primaryKey is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .primaryKey(true);
      expect(columnDefinition).toHaveProperty("options.primaryKey", true);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL PRIMARY KEY");
    });
    
    it("does not add PRIMARY KEY to the definition when primaryKey is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .primaryKey(false);
      expect(columnDefinition).toHaveProperty("options.primaryKey", false);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
  });
  
  describe("after", () => {
  
    it("adds AFTER value to the definition when value is provided", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .after("value");
      expect(columnDefinition).toHaveProperty("options.after", "value");
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL AFTER `value`");
    });
    
    it("does not add AFTER to the definition when value is undefined", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .after(undefined);
      expect(columnDefinition).toHaveProperty("options.after", undefined);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
  });
  
  describe("get", () => {
  
    it("returns the definition", () => {
      const columnDefinition = ColumnDefinition.create("name", "type");
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL");
    });
  
    it("returns the definition with default", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .default("test");
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL DEFAULT test");
    });
  
    it("returns the definition with null default", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .default(null);
      expect(columnDefinition.get()).toEqual("`name` type NOT NULL DEFAULT NULL");
    });
  
  });
  
  describe("hydrateExistingOptions", () => {
    
    it("hydrates existing options", async () => {
      // Mock the query method
      const mockQuery = jest.fn().mockResolvedValue([
        {
          COLUMN_TYPE: "text",
          IS_NULLABLE: "YES",
          COLUMN_DEFAULT: null,
          EXTRA: "auto_increment",
          COLUMN_KEY: "PRI",
        },
      ]);
 
      // Mock the Connection object
      const mockConnection = {
        query: mockQuery,
      };
      
      const columnDefinition = ColumnDefinition.create("name", "type");
      await columnDefinition.hydrateExistingOptions(mockConnection as any, "name", "table");
      expect(columnDefinition).toHaveProperty("existingOptions.nullable", true);
      expect(columnDefinition).toHaveProperty("existingOptions.default", null);
      expect(columnDefinition).toHaveProperty("existingOptions.dropDefault", false);
      expect(columnDefinition).toHaveProperty("existingOptions.unsigned", false);
      expect(columnDefinition).toHaveProperty("existingOptions.autoIncrement", true);
      expect(columnDefinition).toHaveProperty("existingOptions.zeroFill", false);
      expect(columnDefinition).toHaveProperty("existingOptions.primaryKey", true);
    });
    
    it("correctly hydrates existing options with default", async () => {
      // result.COLUMN_DEFAULT === null && !result.IS_NULLABLE ? undefined : result.COLUMN_DEFAULT;
      
      // Mock the query method
      const mockQuery = jest.fn().mockResolvedValue([
        {
          COLUMN_TYPE: "text",
          IS_NULLABLE: "NO",
          COLUMN_DEFAULT: null,
          EXTRA: "auto_increment",
          COLUMN_KEY: "PRI",
        },
      ]);
      
      // Mock the Connection object
      const mockConnection = {
        query: mockQuery,
      };
      
      const columnDefinition = ColumnDefinition.create("name", "type");
      await columnDefinition.hydrateExistingOptions(mockConnection as any, "name", "table");
      
      expect(columnDefinition).toHaveProperty("existingOptions.default", undefined);
    });

    it("throws error if column doesn't exist", async () => {
      
      // Mock the query method
      const mockQuery = jest.fn().mockResolvedValue([]);

      // Mock the Connection object
      const mockConnection = {
        query: mockQuery,
      };
      
      const columnDefinition = ColumnDefinition.create("name", "type");
      await expect(columnDefinition.hydrateExistingOptions(mockConnection as any, "table", "test_table"))
        .rejects
        .toThrow(`Column "table" does not exist in table "test_table"`);
    });
    
  });
  
});
