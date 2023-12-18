import { DoubleColumn } from "./DoubleColumn";

describe("DoubleColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const doubleColumn = new DoubleColumn("balance", { nullable: true, addAfter: "otherColumn" });
      expect(doubleColumn).toHaveProperty("name", "balance");
      expect(doubleColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        precision: undefined,
        scale: undefined,
        index: false,
        addAfter: "otherColumn",
        zeroFill: false
      });
    });
    
    it("throws error when precision or scale is defined but not both", () => {
      expect(() => {
        new DoubleColumn("balance", { precision: 10 });
      }).toThrow("Precision and scale must be both defined or both undefined in column balance");
      expect(() => {
        new DoubleColumn("balance", { scale: 2 });
      }).toThrow("Precision and scale must be both defined or both undefined in column balance");
      expect(() => {
        new DoubleColumn("balance", {});
      }).not.toThrow();
      expect(() => {
        new DoubleColumn("balance", { precision: 10, scale: 2 });
      }).not.toThrow();
    });
    
  });
  
  describe("getColumnDefinition", () => {
  
    it("returns correct column definition", async () => {
      const doubleColumn = new DoubleColumn("balance", { nullable: true, addAfter: "otherColumn" });
      const definition = doubleColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DOUBLE NULL AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a default", async () => {
      const doubleColumn = new DoubleColumn("balance", { nullable: true, addAfter: "otherColumn", default: 0.00 });
      const definition = doubleColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DOUBLE NULL DEFAULT 0 AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a precision and scale", async () => {
      const doubleColumn = new DoubleColumn("balance", { precision: 10, scale: 2, default: 0.00 });
      const definition = doubleColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DOUBLE(10, 2) NOT NULL DEFAULT 0.00");
    });
  
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const doubleColumn = new DoubleColumn("balance", { nullable: true, addAfter: "otherColumn", index: false });
      const definition = doubleColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct index definition", async () => {
      const doubleColumn = new DoubleColumn("balance", { nullable: true, addAfter: "otherColumn", index: true });
      const definition = doubleColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`balance`)");
    });
  
  });
});
