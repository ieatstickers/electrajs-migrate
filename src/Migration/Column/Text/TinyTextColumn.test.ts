import { TinyTextColumn } from "./TinyTextColumn";


describe("TinyTextColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new TinyTextColumn("description");
      expect(blobColumn).toHaveProperty("name", "description");
      expect(blobColumn).toHaveProperty("type", "TINYTEXT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new TinyTextColumn("description"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`description` TINYTEXT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new TinyTextColumn("description")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`description` TINYTEXT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
