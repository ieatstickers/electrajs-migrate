import { AddIndexModification } from "./AddIndexModification";
import { IndexDefinition } from "../../Definition/IndexDefinition";

describe("AddIndexModification", () => {
  
  describe("constructor()", () => {
    
    it("correctly sets the definition property", () => {
      const definition = IndexDefinition.create().columns("column");
      const modification = new AddIndexModification(definition);
      expect(modification["definition"]).toBe(definition);
    });
    
  });
  
  describe("getModificationDefinition()", () => {
    
    it("returns the correct string", () => {
      const definition = IndexDefinition.create().columns("column");
      const modification = new AddIndexModification(definition);
      expect(modification.getModificationDefinition()).toBe("ADD INDEX (`column`)");
    });
    
    it("returns the correct string if default name is set", () => {
      const definition = IndexDefinition
        .create()
        .defaultName(`table_column_index`)
        .columns("column");
      const modification = new AddIndexModification(definition);
      expect(modification.getModificationDefinition()).toBe("ADD INDEX `table_column_index` (`column`)");
    });
    
  });
  
});
