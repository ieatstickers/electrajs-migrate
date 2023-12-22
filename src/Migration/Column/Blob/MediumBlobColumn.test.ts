import { MediumBlobColumn } from "./MediumBlobColumn";

describe("MediumBlobColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new MediumBlobColumn("imageContent");
      expect(blobColumn).toHaveProperty("name", "imageContent");
      expect(blobColumn).toHaveProperty("type", "MEDIUMBLOB");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new MediumBlobColumn("imageContent"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` MEDIUMBLOB NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new MediumBlobColumn("imageContent")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` MEDIUMBLOB NOT NULL AFTER `otherColumn`");
    });
    
  });
});
