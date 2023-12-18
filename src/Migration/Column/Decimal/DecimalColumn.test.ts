import { DecimalColumn } from "./DecimalColumn";

describe("DecimalColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn" });
      expect(decimalColumn).toHaveProperty("name", "balance");
      expect(decimalColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn",
        precision: 10,
        scale: 2,
        unsigned: false,
        zeroFill: false
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
  
    it("returns correct column definition", async () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn" });
      const definition = decimalColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DECIMAL(10, 2) NULL AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a default", async () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn", default: 0.00 });
      const definition = decimalColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DECIMAL(10, 2) NULL DEFAULT 0.00 AFTER `otherColumn`");
    });
  
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn", index: false });
      const definition = decimalColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct index definition", async () => {
      const decimalColumn = new DecimalColumn("balance", { nullable: true, addAfter: "otherColumn", index: true });
      const definition = decimalColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`balance`)");
    });
  
  });
});
