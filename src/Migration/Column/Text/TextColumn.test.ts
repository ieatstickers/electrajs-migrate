import { TextColumn } from "./TextColumn";

describe("TextColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly with no options", () => {
      const stringColumn = new TextColumn("name");
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct definition", async () => {
      const stringColumn = (new TextColumn("name"))
        .nullable()
        .after("otherColumn");
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` TEXT NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition with nullable not specified", () => {
      const stringColumn = (new TextColumn("name")).after("otherColumn");
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` TEXT NOT NULL AFTER `otherColumn`");
    });
    
    it("returns the same instance when called multiple times", () => {
      const textColumn = (new TextColumn("name")).nullable();
      expect(textColumn.getColumnDefinition()).toBe(textColumn.getColumnDefinition());
    });
    
    it("always returns the latest options", () => {
      const textColumn = (new TextColumn("name")).nullable();
      const definition1 = textColumn.getColumnDefinition();
      textColumn.nullable(false);
      const definition2 = textColumn.getColumnDefinition();
      expect(definition1.get()).toEqual("`name` TEXT NOT NULL");
      expect(definition2.get()).toEqual("`name` TEXT NOT NULL");
      
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const stringColumn = new TextColumn("name");
      stringColumn.nullable();
      expect(stringColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new TextColumn("name");
      expect(() => stringColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const stringColumn = new TextColumn("name");
      stringColumn.after("otherColumn");
      expect(stringColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const stringColumn = new TextColumn("name");
      expect(() => stringColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
});
