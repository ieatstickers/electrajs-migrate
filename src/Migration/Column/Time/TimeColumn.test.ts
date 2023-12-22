import { TimeColumn } from "./TimeColumn";

describe("TimeColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const timeColumn = new TimeColumn("startTime");
      expect(timeColumn).toHaveProperty("name", "startTime");
      expect(timeColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const timeColumn = new TimeColumn("startTime");
      timeColumn.nullable();
      expect(timeColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const timeColumn = new TimeColumn("startTime");
      expect(() => timeColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets default option correctly", () => {
      const timeColumn = new TimeColumn("startTime");
      timeColumn.default("20:30:00");
      expect(timeColumn).toHaveProperty("options.default", "20:30:00");
    });
    
    it("throws error if invalid value is passed", () => {
      const timeColumn = new TimeColumn("startTime");
      expect(() => timeColumn.default(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const timeColumn = new TimeColumn("startTime");
      timeColumn.after("otherColumn");
      expect(timeColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const timeColumn = new TimeColumn("startTime");
      expect(() => timeColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const timeColumn = (new TimeColumn("startTime"))
        .nullable()
        .after("otherColumn");
      const definition = timeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`startTime` TIME NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition with default", async () => {
      const timeColumn = (new TimeColumn("startTime"))
        .nullable()
        .default("20:30:00")
        .after("otherColumn");
      const definition = timeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`startTime` TIME NULL DEFAULT '20:30:00' AFTER `otherColumn`");
    });
    
    it("returns correct column definition with nullable not specified", async () => {
      const timeColumn = (new TimeColumn("startTime")).after("otherColumn");
      const definition = timeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`startTime` TIME NOT NULL AFTER `otherColumn`");
    });
    
  });
});
