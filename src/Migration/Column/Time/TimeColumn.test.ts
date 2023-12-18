import { TimeColumn } from "./TimeColumn";

describe("TimeColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const timeColumn = new TimeColumn("startTime", { nullable: true, addAfter: "otherColumn" });
      expect(timeColumn).toHaveProperty("name", "startTime");
      expect(timeColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const timeColumn = new TimeColumn("startTime", { nullable: true, addAfter: "otherColumn" });
      const definition = timeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`startTime` TIME NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition with default", async () => {
      const timeColumn = new TimeColumn("startTime", { nullable: true, default: "20:30:00", addAfter: "otherColumn" });
      const definition = timeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`startTime` TIME NULL DEFAULT '20:30:00' AFTER `otherColumn`");
    });
    
  });
});
