import { MediumIntColumn } from "./MediumIntColumn";

describe("MediumIntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new MediumIntColumn("testNumber");
      expect(blobColumn).toHaveProperty("name", "testNumber");
      expect(blobColumn).toHaveProperty("type", "MEDIUMINT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new MediumIntColumn("testNumber"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` MEDIUMINT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new MediumIntColumn("testNumber")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` MEDIUMINT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
