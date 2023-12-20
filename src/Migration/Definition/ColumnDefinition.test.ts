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
      expect(columnDefinition.get()).toEqual("`name` type DEFAULT value");
    });
    
    it("does not add DEFAULT to the definition when value is undefined", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .default(undefined);
      expect(columnDefinition).toHaveProperty("options.default", undefined);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
  describe("unsigned", () => {
  
    it("adds UNSIGNED to the definition when unsigned is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .unsigned(true);
      expect(columnDefinition).toHaveProperty("options.unsigned", true);
      expect(columnDefinition.get()).toEqual("`name` type UNSIGNED");
    });
    
    it("does not add UNSIGNED to the definition when unsigned is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .unsigned(false);
      expect(columnDefinition).toHaveProperty("options.unsigned", false);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
  describe("autoIncrement", () => {
  
    it("adds AUTO_INCREMENT to the definition when autoIncrement is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .autoIncrement(true);
      expect(columnDefinition).toHaveProperty("options.autoIncrement", true);
      expect(columnDefinition.get()).toEqual("`name` type AUTO_INCREMENT");
    });
    
    it("does not add AUTO_INCREMENT to the definition when autoIncrement is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .autoIncrement(false);
      expect(columnDefinition).toHaveProperty("options.autoIncrement", false);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
  describe("zeroFill", () => {
  
    it("adds ZEROFILL to the definition when zeroFill is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .zeroFill(true);
      expect(columnDefinition).toHaveProperty("options.zeroFill", true);
      expect(columnDefinition.get()).toEqual("`name` type ZEROFILL");
    });
    
    it("does not add ZEROFILL to the definition when zeroFill is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .zeroFill(false);
      expect(columnDefinition).toHaveProperty("options.zeroFill", false);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
  describe("primaryKey", () => {
  
    it("adds PRIMARY KEY to the definition when primaryKey is true", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .primaryKey(true);
      expect(columnDefinition).toHaveProperty("options.primaryKey", true);
      expect(columnDefinition.get()).toEqual("`name` type PRIMARY KEY");
    });
    
    it("does not add PRIMARY KEY to the definition when primaryKey is false", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .primaryKey(false);
      expect(columnDefinition).toHaveProperty("options.primaryKey", false);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
  describe("after", () => {
  
    it("adds AFTER value to the definition when value is provided", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .after("value");
      expect(columnDefinition).toHaveProperty("options.after", "value");
      expect(columnDefinition.get()).toEqual("`name` type AFTER `value`");
    });
    
    it("does not add AFTER to the definition when value is undefined", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .after(undefined);
      expect(columnDefinition).toHaveProperty("options.after", undefined);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
  describe("get", () => {
  
    it("returns the definition", () => {
      const columnDefinition = ColumnDefinition
        .create("name", "type")
        .after(undefined);
      expect(columnDefinition).toHaveProperty("options.after", undefined);
      expect(columnDefinition.get()).toEqual("`name` type");
    });
  
  });
  
});
