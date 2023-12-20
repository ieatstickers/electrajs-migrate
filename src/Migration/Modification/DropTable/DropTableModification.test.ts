import { DropTableModification } from "./DropTableModification";

describe("DropTableModification", () => {
  
  describe("constructor()", () => {
    
    it("correctly sets the definition property", () => {
      const modification = new DropTableModification("column");
      expect(modification["name"]).toBe("column");
    });
    
  });
  
  describe("getModificationDefinition()", () => {
    
    it("returns the correct string", () => {
      const modification = new DropTableModification("column");
      expect(modification.getModificationDefinition()).toBe("DROP TABLE IF EXISTS `column`");
    });
    
  });
  
});
