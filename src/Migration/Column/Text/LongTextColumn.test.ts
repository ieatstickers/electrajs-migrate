import { LongTextColumn } from "./LongTextColumn";


describe("LongTextColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new LongTextColumn("description");
      expect(blobColumn).toHaveProperty("name", "description");
      expect(blobColumn).toHaveProperty("type", "LONGTEXT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new LongTextColumn("description"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`description` LONGTEXT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new LongTextColumn("description")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`description` LONGTEXT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
