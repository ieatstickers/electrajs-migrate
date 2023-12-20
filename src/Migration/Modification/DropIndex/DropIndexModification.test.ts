import { DropIndexModification } from "./DropIndexModification";

describe("DropIndexModification", () => {
  
  describe("constructor()", () => {
    
    it("correctly sets the definition property", () => {
      const modification = new DropIndexModification("column");
      expect(modification["name"]).toBe("column");
    });
    
  });
  
  describe("getModificationDefinition()", () => {
    
    it("returns the correct string", () => {
      const modification = new DropIndexModification("column");
      expect(modification.getModificationDefinition()).toBe("DROP INDEX `column`");
    });
    
  });
  
});
