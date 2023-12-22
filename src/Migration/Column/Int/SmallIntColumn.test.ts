import { SmallIntColumn } from "./SmallIntColumn";

describe("SmallIntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new SmallIntColumn("testNumber");
      expect(blobColumn).toHaveProperty("name", "testNumber");
      expect(blobColumn).toHaveProperty("type", "SMALLINT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new SmallIntColumn("testNumber"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` SMALLINT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new SmallIntColumn("testNumber")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` SMALLINT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
