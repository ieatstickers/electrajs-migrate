import { DoubleColumn } from "./DoubleColumn";

describe("DoubleColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const doubleColumn = new DoubleColumn("balance", { nullable: true, addAfter: "otherColumn" });
      expect(doubleColumn).toHaveProperty("name", "balance");
      expect(doubleColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn",
        zeroFill: false
      });
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
      expect(definition).toEqual("`balance` DOUBLE NULL DEFAULT 0.00 AFTER `otherColumn`");
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
