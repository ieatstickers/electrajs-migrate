import { DropColumnModification } from "./DropColumnModification";

describe("DropColumnModification", () => {
  
  describe("constructor()", () => {
    
    it("correctly sets the definition property", () => {
      const modification = new DropColumnModification("column");
      expect(modification["name"]).toBe("column");
    });
    
  });
  
  describe("getModificationDefinition()", () => {
    
    it("returns the correct string", () => {
      const modification = new DropColumnModification("column");
      expect(modification.getModificationDefinition()).toBe("DROP COLUMN `column`");
    });
    
  });
  
});
