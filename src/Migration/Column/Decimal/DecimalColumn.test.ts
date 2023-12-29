import { DecimalColumn } from "./DecimalColumn";
import { DateTimeColumn } from "../DateTime/DateTimeColumn";

describe("DecimalColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const decimalColumn = new DecimalColumn("balance");
      expect(decimalColumn).toHaveProperty("name", "balance");
      expect(decimalColumn).toHaveProperty("options", {});
    });
    
    it("throws error when invalid precision is passed", () => {
      expect(() => {
        new DecimalColumn("balance", "string" as any, 2);
      }).toThrow(TypeError);
    });
    
    it("throws error when invalid scale is passed", () => {
      expect(() => {
        new DecimalColumn("balance", 8, "string" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("nullable", () => {
    
    it("sets nullable to true", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.nullable();
      expect(decimalColumn).toHaveProperty("options.nullable", true);
    });
    
    it("sets nullable to false", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.nullable(false);
      expect(decimalColumn).toHaveProperty("options.nullable", false);
    });
    
    it("throws error when invalid value is passed", async () => {
      const decimalColumn = new DecimalColumn("balance");
      expect(() => {
        decimalColumn.nullable("invalid" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("default", () => {
    
    it("sets default value", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.default(0.00);
      expect(decimalColumn).toHaveProperty("options.default", 0.00);
    });
    
    it("throws error when invalid value is passed", async () => {
      const decimalColumn = new DecimalColumn("balance");
      expect(() => {
        decimalColumn.default("invalid" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("dropDefault", () => {
    
    it("sets dropDefault to true", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.dropDefault();
      expect(decimalColumn).toHaveProperty("options.dropDefault", true);
    });
    
  });
  
  describe("unsigned", () => {
    
    it("sets unsigned to true", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.unsigned();
      expect(decimalColumn).toHaveProperty("options.unsigned", true);
    });
    
    it("sets unsigned to false", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.unsigned(false);
      expect(decimalColumn).toHaveProperty("options.unsigned", false);
    });
    
    it("throws error when invalid value is passed", async () => {
      const decimalColumn = new DecimalColumn("balance");
      expect(() => {
        decimalColumn.unsigned("invalid" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("zeroFill", () => {
    
    it("sets zeroFill to true", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.zeroFill();
      expect(decimalColumn).toHaveProperty("options.zeroFill", true);
    });
    
    it("sets zeroFill to false", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.zeroFill(false);
      expect(decimalColumn).toHaveProperty("options.zeroFill", false);
    });
    
    it("throws error when invalid value is passed", async () => {
      const decimalColumn = new DecimalColumn("balance");
      expect(() => {
        decimalColumn.zeroFill("invalid" as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("index", () => {
    
    it("sets index to true", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.index();
      expect(decimalColumn).toHaveProperty("options.index", true);
    });
    
  });
  
  describe("dropIndex", () => {
    
    it("sets dropIndex to true", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.dropIndex();
      expect(decimalColumn).toHaveProperty("options.dropIndex", true);
    });
    
  });
  
  describe("after", () => {
    
    it("sets after to given value", async () => {
      const decimalColumn = new DecimalColumn("balance");
      decimalColumn.after("otherColumn");
      expect(decimalColumn).toHaveProperty("options.after", "otherColumn");
    });
    
    it("throws error when invalid value is passed", async () => {
      const decimalColumn = new DecimalColumn("balance");
      expect(() => {
        decimalColumn.after(123 as any);
      }).toThrow(TypeError);
    });
    
  });
  
  describe("getColumnDefinition", () => {
  
    it("returns correct column definition", async () => {
      const decimalColumn = (new DecimalColumn("balance"))
        .nullable()
        .after("otherColumn");
      const definition = decimalColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DECIMAL(8, 2) NULL AFTER `otherColumn`");
    });
  
    it("returns correct column definition with a default", async () => {
      const decimalColumn = (new DecimalColumn("balance")).nullable().after("otherColumn").default(0.00);
      const definition = decimalColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DECIMAL(8, 2) NULL DEFAULT 0.00 AFTER `otherColumn`");
    });
    
    it("returns the correct column definition with nullable not set", () => {
      const decimalColumn = (new DecimalColumn("balance")).after("otherColumn");
      const definition = decimalColumn.getColumnDefinition().get();
      expect(definition).toEqual("`balance` DECIMAL(8, 2) NOT NULL AFTER `otherColumn`");
    })
    
    it("returns the same instance when called multiple times", () => {
      const decimalColumn = (new DecimalColumn("balance")).after("otherColumn").nullable();
      const definition1 = decimalColumn.getColumnDefinition();
      const definition2 = decimalColumn.getColumnDefinition();
      expect(definition1).toBe(definition2);
    });
    
    it("always returns the latest options", () => {
      const decimalColumn = (new DecimalColumn("balance")).after("otherColumn").nullable();
      const definition1 = decimalColumn.getColumnDefinition();
      decimalColumn.nullable(false);
      const definition2 = decimalColumn.getColumnDefinition();
      expect(definition1.get()).toEqual("`balance` DECIMAL(8, 2) NOT NULL AFTER `otherColumn`");
      expect(definition2.get()).toEqual("`balance` DECIMAL(8, 2) NOT NULL AFTER `otherColumn`");
    });
  
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null when index is false", async () => {
      const decimalColumn = (new DecimalColumn("balance"))
        .nullable()
        .after("otherColumn");
      const definition = decimalColumn.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when dropIndex option is true but column doesn't exist", async () => {
      const column = (new DecimalColumn("balance"))
        .nullable(true)
        .after("otherColumn")
        .dropIndex();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns null when index and dropIndex options are both not set", async () => {
      const column = (new DecimalColumn("balance"))
        .nullable(true)
        .after("otherColumn")
        .update();
      const definition = column.getIndexDefinition();
      expect(definition).toBeNull();
    });
    
    it("returns correct index definition", async () => {
      const decimalColumn = (new DecimalColumn("balance")).nullable().after("otherColumn").index();
      const definition = decimalColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`balance`)");
    });
  
  });
});
