import { BlobColumn } from "./BlobColumn";
import { BlobColumnTypeEnum } from "./BlobColumnTypeEnum";

describe("BlobColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new BlobColumn("imageContent", { nullable: true, addAfter: "otherColumn" });
      expect(blobColumn).toHaveProperty("name", "imageContent");
      expect(blobColumn).toHaveProperty("options", {
        type: BlobColumnTypeEnum.BLOB,
        nullable: true,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = new BlobColumn("imageContent", { nullable: true, addAfter: "otherColumn" });
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` BLOB NULL AFTER `otherColumn`");
    });
    
  });
});
