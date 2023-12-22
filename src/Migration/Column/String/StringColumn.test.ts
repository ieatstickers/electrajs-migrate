import { StringColumn } from "./StringColumn";

describe("StringColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly with no options", () => {
      const stringColumn = new StringColumn("name");
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("length", 255);
      expect(stringColumn).toHaveProperty("options", {});
    });
    
    it("initializes properties correctly with options", () => {
      const stringColumn = new StringColumn("name", 200);
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("length", 200);
      expect(stringColumn).toHaveProperty("options", {});
    });
    
    it("throws error if invalid value is passed", () => {
      expect(() => new StringColumn("name", "string" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct definition", async () => {
      const stringColumn = (new StringColumn("name"))
        .nullable()
        .after("otherColumn");
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` VARCHAR(255) NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition with length", async () => {
      const stringColumn = (new StringColumn("name", 50))
        .nullable(true)
        .after("otherColumn");
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` VARCHAR(50) NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition with nullable not specified", () => {
      const stringColumn = (new StringColumn("name")).after("otherColumn");
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` VARCHAR(255) NOT NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition with default", () => {
      const stringColumn = (new StringColumn("name"))
        .default("test")
        .after("otherColumn");
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` VARCHAR(255) NOT NULL DEFAULT 'test' AFTER `otherColumn`");
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const stringColumn = new StringColumn("name");
      stringColumn.nullable();
      expect(stringColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new StringColumn("name");
      expect(() => stringColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("primaryKey", () => {
    
    it("sets primaryKey option correctly", () => {
      const stringColumn = new StringColumn("name");
      stringColumn.primaryKey();
      expect(stringColumn).toHaveProperty("options.primaryKey", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new StringColumn("name");
      expect(() => stringColumn.primaryKey("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets default option correctly", () => {
      const stringColumn = new StringColumn("name");
      stringColumn.default("test");
      expect(stringColumn).toHaveProperty("options.default", "test");
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new StringColumn("name");
      expect(() => stringColumn.default(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("index", () => {
    
    it("sets index option correctly", () => {
      const stringColumn = new StringColumn("name");
      stringColumn.index();
      expect(stringColumn).toHaveProperty("options.index", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new StringColumn("name");
      expect(() => stringColumn.index("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const stringColumn = new StringColumn("name");
      stringColumn.after("otherColumn");
      expect(stringColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new StringColumn("name");
      expect(() => stringColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null if index is false", async () => {
      const stringColumn = (new StringColumn("name"))
        .nullable()
        .after("otherColumn");
      const definition = stringColumn.getIndexDefinition();
      expect(definition).toEqual(null);
    });
    
    it("returns the correct definition", async () => {
      const stringColumn = (new StringColumn("name"))
        .nullable()
        .index()
        .after("otherColumn")
      const definition = stringColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`name`)");
    });
    
  });
});
