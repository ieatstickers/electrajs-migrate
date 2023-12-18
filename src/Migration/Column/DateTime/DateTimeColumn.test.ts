import { DateTimeColumn } from "./DateTimeColumn";

describe("DateTimeColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      expect(datetimeColumn).toHaveProperty("name", "created");
      expect(datetimeColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns correct definition when nullable is true", async () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NULL AFTER `otherColumn`");
    });
    
    it("returns correct definition when nullable is false", async () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: false, addAfter: "otherColumn" });
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NOT NULL AFTER `otherColumn`");
    });
    
    it("returns correct definition when default is set", async () => {
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, default: "2020-01-01 00:00:00", addAfter: "otherColumn" });
      const definition = datetimeColumn.getColumnDefinition().get();
      expect(definition).toEqual("`created` DATETIME NULL DEFAULT '2020-01-01 00:00:00' AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, addAfter: "otherColumn" });
      const definition = datetimeColumn.getIndexDefinition();
      expect(definition).toEqual(null);
      
    });
    
    it("returns correct definition when index is true", async () => {
      
      const datetimeColumn = new DateTimeColumn("created", { nullable: true, index: true, addAfter: "otherColumn" });
      const definition = datetimeColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`created`)");
      
    });
    
  });
});
