import { MediumTextColumn } from "./MediumTextColumn";


describe("MediumTextColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new MediumTextColumn("description");
      expect(blobColumn).toHaveProperty("name", "description");
      expect(blobColumn).toHaveProperty("type", "MEDIUMTEXT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new MediumTextColumn("description"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`description` MEDIUMTEXT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new MediumTextColumn("description")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`description` MEDIUMTEXT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
