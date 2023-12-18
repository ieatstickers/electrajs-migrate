import { EnumColumn } from "./EnumColumn";

describe("EnumColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(enumColumn).toHaveProperty("name", "status");
      expect(enumColumn).toHaveProperty("options", {
        nullable: true,
        default: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("throws an error when the values are invalid", () => {
      expect(() => {
        new EnumColumn(
          "name",
          [ "" ],
          {
            nullable: true,
            addAfter: "otherColumn"
          }
        );
      }).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct column definition", async () => {
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      const definition = enumColumn.getColumnDefinition().get();
      expect(definition).toEqual("`status` ENUM('active', 'inactive') NULL AFTER `otherColumn`");
    });
    
    it("returns the correct column definition when default is set", async () => {
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          default: "active",
          addAfter: "otherColumn"
        }
      );
      const definition = enumColumn.getColumnDefinition().get();
      expect(definition).toEqual("`status` ENUM('active', 'inactive') NULL DEFAULT 'active' AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      const definition = enumColumn.getIndexDefinition();
      expect(definition).toEqual(null);
    });
    
    it("returns the correct index definition when index is true", async () => {
      const enumColumn = new EnumColumn(
        "status",
        [ "active", "inactive" ],
        {
          nullable: true,
          index: true,
          addAfter: "otherColumn"
        }
      );
      const definition = enumColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`status`)");
    });
    
  });
});
