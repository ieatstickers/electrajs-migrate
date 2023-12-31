import { BlobColumn } from "./BlobColumn";

describe("BlobColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new BlobColumn("imageContent");
      expect(blobColumn).toHaveProperty("name", "imageContent");
      expect(blobColumn).toHaveProperty("type", "BLOB");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable option correctly", () => {
      const blobColumn = new BlobColumn("imageContent");
      blobColumn.nullable();
      expect(blobColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error if invalid value is passed", () => {
      const blobColumn = new BlobColumn("imageContent");
      expect(() => blobColumn.nullable("invalid" as any)).toThrow(TypeError);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after option correctly", () => {
      const blobColumn = new BlobColumn("imageContent");
      blobColumn.after("otherColumn");
      expect(blobColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error if invalid value is passed", () => {
      const blobColumn = new BlobColumn("imageContent");
      expect(() => blobColumn.after(123 as any)).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new BlobColumn("imageContent"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` BLOB NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new BlobColumn("imageContent")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`imageContent` BLOB NOT NULL AFTER `otherColumn`");
    });
    
    it("returns the same instance when called multiple times", () => {
      const blobColumn = (new BlobColumn("imageContent"))
        .nullable(true)
        .after("otherColumn");
      const definition1 = blobColumn.getColumnDefinition();
      const definition2 = blobColumn.getColumnDefinition();
      expect(definition1).toBe(definition2);
    });
    
    it("always returns the latest options", () => {
      const blobColumn = (new BlobColumn("imageContent"))
        .nullable(true)
        .after("otherColumn");
      const definition1 = blobColumn.getColumnDefinition();
      blobColumn.nullable(false);
      blobColumn.after("anotherColumn");
      const definition2 = blobColumn.getColumnDefinition();
      expect(definition1.get()).toEqual("`imageContent` BLOB NOT NULL AFTER `anotherColumn`");
      expect(definition2.get()).toEqual("`imageContent` BLOB NOT NULL AFTER `anotherColumn`");
    });
    
  });
});
