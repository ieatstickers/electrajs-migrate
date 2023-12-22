import { IntColumn } from "./IntColumn";

describe("IntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const intColumn = new IntColumn("age");
      expect(intColumn).toHaveProperty("name", "age");
      expect(intColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.nullable();
      expect(intColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("primaryKey", () => {
    
    it("sets primaryKey option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.primaryKey();
      expect(intColumn).toHaveProperty("options.primaryKey", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.primaryKey("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets default option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.default(0);
      expect(intColumn).toHaveProperty("options.default", 0);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.default("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("unsigned", () => {
    
    it("sets unsigned option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.unsigned();
      expect(intColumn).toHaveProperty("options.unsigned", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.unsigned("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("autoIncrement", () => {
    
    it("sets autoIncrement option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.autoIncrement();
      expect(intColumn).toHaveProperty("options.autoIncrement", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.autoIncrement("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("zeroFill", () => {
    
    it("sets zeroFill option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.zeroFill();
      expect(intColumn).toHaveProperty("options.zeroFill", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.zeroFill("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("index", () => {
    
    it("sets index option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.index();
      expect(intColumn).toHaveProperty("options.index", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.index("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.after("otherColumn");
      expect(intColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const intColumn = new IntColumn("age");
      expect(() => intColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct definition", async () => {
      const intColumn = (new IntColumn("age"))
        .nullable()
        .after("otherColumn");
      const definition = intColumn.getColumnDefinition().get();
      expect(definition).toEqual("`age` INT NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition when nullable is not specified", async () => {
      const intColumn = (new IntColumn("age")).after("otherColumn");
      const definition = intColumn.getColumnDefinition().get();
      expect(definition).toEqual("`age` INT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const intColumn = (new IntColumn("age"))
        .nullable()
        .after("otherColumn");
      const definition = intColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns the correct definition", async () => {
      const intColumn = (new IntColumn("age"))
        .nullable()
        .after("otherColumn")
        .index();
      const definition = intColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`age`)");
    });
    
  });
});
