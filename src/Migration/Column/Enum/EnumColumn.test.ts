import { EnumColumn } from "./EnumColumn";

describe("EnumColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const enumColumn = new EnumColumn("status", [ "active", "inactive" ]);
      expect(enumColumn).toHaveProperty("name", "status");
      expect(enumColumn).toHaveProperty("options", {});
    });
    
    it("throws an error when the values are invalid", () => {
      expect(() => {
        new EnumColumn("name", [ "" ]);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets the nullable option correctly", () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable();
      expect(enumColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws an error when the value is invalid", () => {
      expect(() => {
        (new EnumColumn("status", [ "active", "inactive" ]))
          .nullable("invalid" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets the default option correctly", () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .default("active");
      expect(enumColumn).toHaveProperty("options.default", "active");
    });
    
    it("throws an error when the value is invalid", () => {
      expect(() => {
        (new EnumColumn("status", [ "active", "inactive" ]))
          .default(1 as any);
      }).toThrow(TypeError);
    });
    
    it("throws an error when the value is not in the values array", () => {
      expect(() => {
        (new EnumColumn("status", [ "active", "inactive" ]))
          .default("invalid");
      }).toThrow(TypeError);
    });
    
  });
  
  describe("dropDefault", () => {
    
    it("sets the dropDefault option correctly", () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .dropDefault();
      expect(enumColumn).toHaveProperty("options.dropDefault", true);
    });
    
  });
  
  describe("index", () => {
    
    it("sets the index option correctly", () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .index();
      expect(enumColumn).toHaveProperty("options.index", true);
    });
    
  });
  
  describe("dropIndex", () => {
    
    it("sets the dropIndex option correctly", () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .dropIndex();
      expect(enumColumn).toHaveProperty("options.dropIndex", true);
    });
    
  });
  
  describe("after", () => {
    
    it("sets the after option correctly", () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .after("otherColumn");
      expect(enumColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws an error when the value is invalid", () => {
      expect(() => {
        (new EnumColumn("status", [ "active", "inactive" ]))
          .after(1 as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct column definition", async () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable()
        .after("otherColumn");
      const definition = enumColumn.getColumnDefinition().get();
      expect(definition).toEqual("`status` ENUM('active', 'inactive') NULL AFTER `otherColumn`");
    });
    
    it("returns the correct column definition when default is set", async () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable()
        .default("active")
        .after("otherColumn");
      const definition = enumColumn.getColumnDefinition().get();
      expect(definition).toEqual("`status` ENUM('active', 'inactive') NULL DEFAULT 'active' AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable()
        .after("otherColumn");
      const definition = enumColumn.getIndexDefinition();
      expect(definition).toEqual(null);
    });
    
    it("returns null when dropIndex option is true but column doesn't exist", async () => {
      const column = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable(true)
        .after("otherColumn")
        .dropIndex();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when index and dropIndex options are both not set", async () => {
      const column = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable(true)
        .after("otherColumn")
        .update();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns the correct index definition when index is true", async () => {
      const enumColumn = (new EnumColumn("status", [ "active", "inactive" ]))
        .nullable()
        .index()
        .after("otherColumn");
      const definition = enumColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`status`)");
    });
    
  });
});
