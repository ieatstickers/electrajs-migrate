import { DateColumn } from "./DateColumn";

describe("DateColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn" });
      expect(dateColumn).toHaveProperty("name", "dateOfBirth");
      expect(dateColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct column definition", async () => {
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn" });
      const definition = dateColumn.getColumnDefinition().get();
      expect(definition).toEqual("`dateOfBirth` DATE NULL AFTER `otherColumn`");
    });
    
    it("returns correct column definition with default", async () => {
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn", default: "2023-12-17" });
      const definition = dateColumn.getColumnDefinition().get();
      expect(definition).toEqual("`dateOfBirth` DATE NULL DEFAULT '2023-12-17' AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index option is false", async () => {
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn" });
      const definition = dateColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct index definition", async () => {
      const dateColumn = new DateColumn("dateOfBirth", { nullable: true, addAfter: "otherColumn", index: true });
      const definition = dateColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`dateOfBirth`)");
    });
    
  });
});
