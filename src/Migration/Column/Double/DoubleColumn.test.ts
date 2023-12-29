import { DoubleColumn } from "./DoubleColumn";

describe("DoubleColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn).toHaveProperty("name", "balance");
      expect(doubleColumn).toHaveProperty("options", {});
    });
    
    it("throws error when precision or scale is defined but not both", () => {
      expect(() => {
        new DoubleColumn("balance", 10);
      }).toThrow("Precision and scale must be both defined or both undefined in column balance");
      expect(() => {
        new DoubleColumn("balance", undefined, 2);
      }).toThrow("Precision and scale must be both defined or both undefined in column balance");
      expect(() => {
        new DoubleColumn("balance");
      }).not.toThrow();
      expect(() => {
        new DoubleColumn("balance", 10, 2);
      }).not.toThrow();
    });
    
it("throws error when precision is invalid", () => {
      expect(() => {
        new DoubleColumn("balance", "string" as any, 10);
      }).toThrow(TypeError);
    });
    
    it("throws error when scale is invalid", () => {
      expect(() => {
        new DoubleColumn("balance", 10, "string" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("nullable", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.nullable()).toBe(doubleColumn);
    });
    
    it("sets nullable to true", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.nullable();
      expect(doubleColumn).toHaveProperty("options.nullable", true);
    });
    
    it("throws error when nullable is invalid", () => {
      expect(() => {
        new DoubleColumn("balance").nullable("string" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.default(0.00)).toBe(doubleColumn);
    });
    
    it("sets default to given value", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.default(0.00);
      expect(doubleColumn).toHaveProperty("options.default", 0.00);
    });
    
    it("throws error when default is invalid", () => {
      expect(() => {
        new DoubleColumn("balance").default("string" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("dropDefault", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.dropDefault()).toBe(doubleColumn);
    });
    
    it("sets dropDefault to true", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.dropDefault();
      expect(doubleColumn).toHaveProperty("options.dropDefault", true);
    });
    
  });
  
  describe("zeroFill", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.zeroFill()).toBe(doubleColumn);
    });
    
    it("sets zeroFill to true", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.zeroFill();
      expect(doubleColumn).toHaveProperty("options.zeroFill", true);
    });
    
    it("throws error when zeroFill is invalid", () => {
      expect(() => {
        new DoubleColumn("balance").zeroFill("string" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("index", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.index()).toBe(doubleColumn);
    });
    
    it("sets index to true", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.index();
      expect(doubleColumn).toHaveProperty("options.index", true);
    });
    
  });

  describe("dropIndex", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.dropIndex()).toBe(doubleColumn);
    });
    
    it("sets dropIndex to true", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.dropIndex();
      expect(doubleColumn).toHaveProperty("options.dropIndex", true);
    });
    
  });
  
  describe("after", () => {
    
    it("returns itself", () => {
      const doubleColumn = new DoubleColumn("balance");
      expect(doubleColumn.after("otherColumn")).toBe(doubleColumn);
    });
    
    it("sets after to given value", () => {
      const doubleColumn = new DoubleColumn("balance");
      doubleColumn.after("otherColumn");
      expect(doubleColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error when after is invalid", () => {
      expect(() => {
        new DoubleColumn("balance").after(10 as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
  
    it("returns correct column definition", async () => {
      const doubleColumn = (new DoubleColumn("balance"))
        .nullable()
        .after("otherColumn");
      const definition = doubleColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DOUBLE NULL AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a default", async () => {
      const doubleColumn = (new DoubleColumn("balance"))
        .nullable()
        .after("otherColumn")
        .default(0.00);
      const definition = doubleColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DOUBLE NULL DEFAULT 0 AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a precision and scale", async () => {
      const doubleColumn = (new DoubleColumn("balance", 10, 2))
        .default(0.00);
      const definition = doubleColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DOUBLE(10, 2) NOT NULL DEFAULT 0.00");
    });
    
    it("returns the same instance when called multiple times", () => {
      const doubleColumn = (new DoubleColumn("balance")).after("otherColumn").nullable();
      const definition1 = doubleColumn.getColumnDefinition();
      const definition2 = doubleColumn.getColumnDefinition();
      expect(definition1).toBe(definition2);
    });
    
    it("always returns the latest options", () => {
      const doubleColumn = (new DoubleColumn("balance")).after("otherColumn").nullable();
      const definition1 = doubleColumn.getColumnDefinition();
      doubleColumn.nullable(false);
      const definition2 = doubleColumn.getColumnDefinition();
      expect(definition1.get()).toEqual("`balance` DOUBLE NOT NULL AFTER `otherColumn`");
      expect(definition2.get()).toEqual("`balance` DOUBLE NOT NULL AFTER `otherColumn`");
    });
  
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const doubleColumn = (new DoubleColumn("balance"))
        .nullable()
        .after("otherColumn");
      const definition = doubleColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when dropIndex option is true but column doesn't exist", async () => {
      const column = (new DoubleColumn("balance"))
        .nullable(true)
        .after("otherColumn")
        .dropIndex();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when index and dropIndex options are both not set", async () => {
      const column = (new DoubleColumn("balance"))
        .nullable(true)
        .after("otherColumn")
        .update();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct index definition", async () => {
      const doubleColumn = (new DoubleColumn("balance")).nullable().after("otherColumn").index();
      const definition = doubleColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`balance`)");
    });
  
  });
});
