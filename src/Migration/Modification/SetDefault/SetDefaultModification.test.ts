import { SetDefaultModification } from "./SetDefaultModification";

describe("SetDefaultModification", () => {
  
  describe("constructor()", () => {
    
    it("correctly sets the definition property", () => {
      const modification = new SetDefaultModification("name", "default_value");
      expect(modification["name"]).toBe("name");
      expect(modification["defaultValue"]).toBe("default_value");
    });
    
  });
  
  describe("getModificationDefinition()", () => {
    
    it("returns the correct string", () => {
      const modification = new SetDefaultModification("name", "default_value");
      expect(modification.getModificationDefinition()).toBe("MODIFY COLUMN `name` DEFAULT 'default_value'");
    });
    
    it("returns the correct string when setting to null", () => {
      const modification = new SetDefaultModification("name", null);
      expect(modification.getModificationDefinition()).toBe("MODIFY COLUMN `name` DEFAULT NULL");
    });
    
    it("returns the correct string when setting to undefined", () => {
      const modification = new SetDefaultModification("name", undefined);
      expect(modification.getModificationDefinition()).toBe("MODIFY COLUMN `name` DEFAULT NULL");
    });
    
    it("returns the correct string when setting to number", () => {
      const modification = new SetDefaultModification("name", 123);
      expect(modification.getModificationDefinition()).toBe("MODIFY COLUMN `name` DEFAULT 123");
    });
    
  });
  
});
