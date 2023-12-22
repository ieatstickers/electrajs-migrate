import { BigIntColumn } from "./BigIntColumn";

describe("BigIntColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new BigIntColumn("testNumber");
      expect(blobColumn).toHaveProperty("name", "testNumber");
      expect(blobColumn).toHaveProperty("type", "BIGINT");
      expect(blobColumn).toHaveProperty("options", {});
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const blobColumn = (new BigIntColumn("testNumber"))
        .nullable(true)
        .after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` BIGINT NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition when nullable is not specified", async () => {
      const blobColumn = (new BigIntColumn("testNumber")).after("otherColumn");
      const definition = blobColumn.getColumnDefinition().get();
      expect(definition).toEqual("`testNumber` BIGINT NOT NULL AFTER `otherColumn`");
    });
    
  });
  
});
