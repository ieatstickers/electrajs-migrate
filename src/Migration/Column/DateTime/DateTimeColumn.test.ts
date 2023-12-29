import { DateTimeColumn } from "./DateTimeColumn";

describe("DateTimeColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      expect(datetimeColumn).toHaveProperty("name", "created");
      expect(datetimeColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      datetimeColumn.nullable();
      expect(datetimeColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const datetimeColumn = new DateTimeColumn("created");
      expect(() => datetimeColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets default option correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      datetimeColumn.default("2023-12-17 12:00:00");
      expect(datetimeColumn).toHaveProperty("options.default", "2023-12-17 12:00:00");
    });
    
    it("throws error if invalid value is passed", () => {
      const datetimeColumn = new DateTimeColumn("created");
      expect(() => datetimeColumn.default(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("dropDefault", () => {
    
    it("sets dropDefault option correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      datetimeColumn.dropDefault();
      expect(datetimeColumn).toHaveProperty("options.dropDefault", true);
    });
    
  });
  
  describe("index", () => {
    
    it("sets index option correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      datetimeColumn.index();
      expect(datetimeColumn).toHaveProperty("options.index", true);
    });
    
  });
  
  describe("dropIndex", () => {
    
    it("sets dropIndex option correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      datetimeColumn.dropIndex();
      expect(datetimeColumn).toHaveProperty("options.dropIndex", true);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const datetimeColumn = new DateTimeColumn("created");
      datetimeColumn.after("otherColumn");
      expect(datetimeColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const datetimeColumn = new DateTimeColumn("created");
      expect(() => datetimeColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct definition when nullable is true", async () => {
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn");
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NULL AFTER `otherColumn`");
    });
    
    it("returns correct definition when nullable is false", async () => {
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(false)
        .after("otherColumn");
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NOT NULL AFTER `otherColumn`");
    });
    
    it("returns correct definition when default is set", async () => {
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn")
        .default("2020-01-01 00:00:00");
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NULL DEFAULT '2020-01-01 00:00:00' AFTER `otherColumn`");
    });
    
    it("returns the correct definition when nullable not set", async () => {
      const datetimeColumn = (new DateTimeColumn("created"))
        .after("otherColumn");
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NOT NULL AFTER `otherColumn`");
    });
    
    it("returns the same instance when called multiple times", () => {
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn");
      const definition1 = datetimeColumn.getColumnDefinition();
      const definition2 = datetimeColumn.getColumnDefinition();
      expect(definition1).toBe(definition2);
    });
    
    it("always returns the latest options", () => {
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn");
      const definition1 = datetimeColumn.getColumnDefinition();
      datetimeColumn.nullable(false);
      const definition2 = datetimeColumn.getColumnDefinition();
      expect(definition1.get()).toEqual("`created` DATETIME NOT NULL AFTER `otherColumn`");
      expect(definition2.get()).toEqual("`created` DATETIME NOT NULL AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn");
      const definition = datetimeColumn.getIndexDefinition();
      expect(definition).toEqual(null);
      
    });
    
    it("returns null when dropIndex option is true but column doesn't exist", async () => {
      const column = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn")
        .dropIndex();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when index and dropIndex options are both not set", async () => {
      const column = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn")
        .update();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct definition when index is true", async () => {
      
      const datetimeColumn = (new DateTimeColumn("created"))
        .nullable(true)
        .after("otherColumn")
        .index();
      const definition = datetimeColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`created`)");
      
    });
    
  });
});
