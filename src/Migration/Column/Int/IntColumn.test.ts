import { IntColumn } from "./IntColumn";
import { IntColumnTypeEnum } from "./IntColumnTypeEnum";

describe("IntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      expect(intColumn).toHaveProperty("name", "age");
      expect(intColumn).toHaveProperty("options", {
        type: IntColumnTypeEnum.INT,
        nullable: true,
        default: undefined,
        unsigned: false,
        autoIncrement: false,
        zeroFill: false,
        primaryKey: false,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct definition", async () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      const definition = intColumn.getColumnDefinition().get();
      expect(definition).toEqual("`age` INT NULL AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn" });
      const definition = intColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns the correct definition", async () => {
      const intColumn = new IntColumn("age", { nullable: true, addAfter: "otherColumn", index: true });
      const definition = intColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`age`)");
    });
    
  });
});
