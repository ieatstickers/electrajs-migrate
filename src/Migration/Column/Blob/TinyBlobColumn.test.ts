import { TinyBlobColumn } from "./TinyBlobColumn";

describe("TinyBlobColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new TinyBlobColumn("imageContent");
      expect(blobColumn).toHaveProperty("name", "imageContent");
      expect(blobColumn).toHaveProperty("type", "TINYBLOB");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new TinyBlobColumn("imageContent"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` TINYBLOB NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new TinyBlobColumn("imageContent")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` TINYBLOB NOT NULL AFTER `otherColumn`");
    });
    
  });
});
