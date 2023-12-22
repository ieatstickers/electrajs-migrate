import { DateColumn } from "./DateColumn";

describe("DateColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      expect(dateColumn).toHaveProperty("name", "dateOfBirth");
      expect(dateColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      dateColumn.nullable();
      expect(dateColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      expect(() => dateColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets default option correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      dateColumn.default("2023-12-17");
      expect(dateColumn).toHaveProperty("options.default", "2023-12-17");
    });
    
    it("throws error if invalid value is passed", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      expect(() => dateColumn.default(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      dateColumn.after("otherColumn");
      expect(dateColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      expect(() => dateColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("index", () => {
    
    it("sets index option correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      dateColumn.index();
      expect(dateColumn).toHaveProperty("options.index", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const dateColumn = new DateColumn("dateOfBirth");
      expect(() => dateColumn.index("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const dateColumn = (new DateColumn("dateOfBirth"))
        .nullable(true)
        .after("otherColumn");
      const definition = dateColumn.getColumnDefinition().get();
      expect(definition).toEqual("`dateOfBirth` DATE NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition with default", async () => {
      const dateColumn = (new DateColumn("dateOfBirth"))
        .nullable(true)
        .after("otherColumn")
        .default("2023-12-17");
      const definition = dateColumn.getColumnDefinition().get();
      expect(definition).toEqual("`dateOfBirth` DATE NULL DEFAULT '2023-12-17' AFTER `otherColumn`");
    });
    
    it("returns correct column definition without nullable", async () => {
      const dateColumn = (new DateColumn("dateOfBirth"))
        .after("otherColumn");
      const definition = dateColumn.getColumnDefinition().get();
      expect(definition).toEqual("`dateOfBirth` DATE NOT NULL AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index option is false", async () => {
      const dateColumn = (new DateColumn("dateOfBirth"))
        .nullable(true)
        .after("otherColumn");
      const definition = dateColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct index definition", async () => {
      const dateColumn = (new DateColumn("dateOfBirth"))
        .nullable(true)
        .after("otherColumn")
        .index(true);
      const definition = dateColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`dateOfBirth`)");
    });
    
    
  });
});
