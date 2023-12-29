import { IntColumn } from "./IntColumn";
import { DoubleColumn } from "../Double/DoubleColumn";

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
  
  describe("dropDefault", () => {
    
    it("sets dropDefault option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.dropDefault();
      expect(intColumn).toHaveProperty("options.dropDefault", true);
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
    
  });
  
  describe("dropIndex", () => {
    
    it("sets dropIndex option correctly", () => {
      const intColumn = new IntColumn("age");
      intColumn.dropIndex();
      expect(intColumn).toHaveProperty("options.dropIndex", true);
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
    
    it("returns the same instance when called multiple times", () => {
      const intColumn = new IntColumn("age");
      expect(intColumn.getColumnDefinition()).toBe(intColumn.getColumnDefinition());
    });
    
    it("always returns the latest options", () => {
      const intColumn = (new IntColumn("age")).nullable();
      const definition1 = intColumn.getColumnDefinition();
      intColumn.nullable(false);
      const definition2 = intColumn.getColumnDefinition();
      expect(definition1.get()).toEqual("`age` INT NOT NULL");
      expect(definition2.get()).toEqual("`age` INT NOT NULL");
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
    
    it("returns null when dropIndex option is true but column doesn't exist", async () => {
      const column = (new IntColumn("age"))
        .nullable(true)
        .after("otherColumn")
        .dropIndex();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when index and dropIndex options are both not set", async () => {
      const column = (new IntColumn("age"))
        .nullable(true)
        .after("otherColumn")
        .update();
      const definition = column.getIndexDefinition();
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
