import { LongBlobColumn } from "./LongBlobColumn";

describe("LongBlobColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new LongBlobColumn("imageContent");
      expect(blobColumn).toHaveProperty("name", "imageContent");
      expect(blobColumn).toHaveProperty("type", "LONGBLOB");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new LongBlobColumn("imageContent"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` LONGBLOB NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new LongBlobColumn("imageContent")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` LONGBLOB NOT NULL AFTER `otherColumn`");
    });
    
  });
});
