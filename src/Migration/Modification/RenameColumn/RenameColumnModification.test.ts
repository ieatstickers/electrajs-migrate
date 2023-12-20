import { RenameColumnModification } from "./RenameColumnModification";

describe("RenameColumnModification", () => {
  
  describe("constructor()", () => {
    
    it("correctly sets the definition property", () => {
      const modification = new RenameColumnModification("from", "to");
      expect(modification["currentName"]).toBe("from");
      expect(modification["newName"]).toBe("to");
    });
    
  });
  
  describe("getModificationDefinition()", () => {
    
    it("returns the correct string", () => {
      const modification = new RenameColumnModification("from", "to");
      expect(modification.getModificationDefinition()).toBe("RENAME COLUMN `from` TO `to`");
    });
    
  });
  
});
