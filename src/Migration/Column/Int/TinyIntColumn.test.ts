import { TinyIntColumn } from "./TinyIntColumn";

describe("TinyIntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new TinyIntColumn("testNumber");
      expect(blobColumn).toHaveProperty("name", "testNumber");
      expect(blobColumn).toHaveProperty("type", "TINYINT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new TinyIntColumn("testNumber"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` TINYINT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new TinyIntColumn("testNumber")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` TINYINT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
