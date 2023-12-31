import { AbstractColumn } from "./AbstractColumn";
import { Schema, Validators } from "@electra/utility";
import { Log } from "../../Utility/Log/Log";
import { ColumnDefinition } from "../Definition/ColumnDefinition";
import { ValidatorResult } from "@electra/utility/dist/src/Validators/Type/ValidatorResult";

class TestColumn extends AbstractColumn
{
  public constructor()
  {
    super("test");
  }
  
  public getColumnDefinition(): ColumnDefinition { return ColumnDefinition.create("test", ""); }
  
  public testValidateName(name: string): ValidatorResult
  {
    return this.validateColumnName(name);
  }
  
  public testValidateOptions(options: any, schema: Schema): boolean
  {
    return this.validateOptions(options, schema);
  }
}

class TestColumnInvalidName extends AbstractColumn
{
  constructor()
  {
    super("");
  }
  
  public getColumnDefinition(): ColumnDefinition { return ColumnDefinition.create("test", ""); }
}

jest.mock("../../Utility/Log/Log");

describe("AbstractColumn", () => {
  let testColumn;
  
  beforeEach(() => {
    testColumn = new TestColumn();
  });
  
  describe("constructor", () => {
    
    it("throws an error for an invalid name", () => {
      expect(() => new TestColumnInvalidName()).toThrow(TypeError);
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null", () => {
      expect(testColumn.getIndexDefinition()).toBe(null);
    });
    
  });
  
  describe("getName", () => {
    
    it("returns the name", () => {
      expect(testColumn.getName()).toBe("test");
    });
    
  });
  
  describe("exists", () => {
    
    it("returns false", () => {
      expect(testColumn.exists()).toBe(false);
    });
    
  });
  
  describe("update", () => {
    
    it("returns the instance", () => {
      expect(testColumn.update()).toBe(testColumn);
    });
    
    it("sets columnExists to true", () => {
      expect(testColumn.exists()).toBe(false);
      testColumn.update();
      expect(testColumn.exists()).toBe(true);
    });
    
  });
  
  describe("validateColumnName", () => {
    
    it("validates a valid column name", () => {
      expect(testColumn.testValidateName("validName")).toEqual({ valid: true, message: null, value: "validName" });
    });
    
    it("validates an invalid column name", () => {
      expect(testColumn.testValidateName("")).toEqual({ valid: false, message: "Value must be at least 1 in length - string of length 0 provided", value: "" });
    });
    
  });
  
  describe("validateOptions", () => {
    
    const schema = {
      testString: Validators.string(),
      testNumber: Validators.number(),
      testBoolean: Validators.boolean(),
      testOptional: Validators.string({ optional: true })
    };
    
    it("validates valid options", () => {
      const options = {
        testString: "test",
        testNumber: 123,
        testBoolean: true
      };
      expect(testColumn.testValidateOptions(options, schema)).toBe(true);
    });
    
    it("throws an error for invalid options", () => {
      const options = {
        testString: "test",
        testNumber: "123",
        testBoolean: true
      };
      expect(() => testColumn.testValidateOptions(options, schema)).toThrow(TypeError);
    });
    
    
  });
  
  describe("addNullableStatement", () => {
    
    it("adds a nullable statement", () => {
      expect(testColumn.addNullableStatement("columnDefinition", true)).toBe("columnDefinition NULL");
    });
    
    it("adds a not nullable statement", () => {
      expect(testColumn.addNullableStatement("columnDefinition", false)).toBe("columnDefinition NOT NULL");
    });
  });
  
  describe("addDefaultStatement", () => {
    
    it("adds a default statement", () => {
      expect(testColumn.addDefaultStatement("columnDefinition", "defaultValue"))
        .toBe("columnDefinition DEFAULT defaultValue");
    });
    
    it("does not add a default statement", () => {
      expect(testColumn.addDefaultStatement("columnDefinition", undefined)).toBe("columnDefinition");
    });
    
  });
  
  describe("addIndexStatement", () => {
    
    it("adds an index statement", () => {
      expect(testColumn.addIndexStatement("columnDefinition", true, "`testColumn`")).toBe("columnDefinition, ADD INDEX (`testColumn`)");
    });
    
    it("does not add an index statement", () => {
      expect(testColumn.addIndexStatement("columnDefinition", false, "`testColumn`")).toBe("columnDefinition");
    });
    
  });
  
  describe("addUnsignedStatement", () => {
    
    it("adds an unsigned statement", () => {
      expect(testColumn.addUnsignedStatement("columnDefinition", true)).toBe("columnDefinition UNSIGNED");
    });
    
    it("does not add an unsigned statement", () => {
      expect(testColumn.addUnsignedStatement("columnDefinition", false)).toBe("columnDefinition");
    });
    
  });
  
  describe("addZeroFillStatement", () => {
    
    it("adds a zeroFill statement", () => {
      expect(testColumn.addZeroFillStatement("columnDefinition", true)).toBe("columnDefinition ZEROFILL");
    });
    
    it("does not add a zeroFill statement", () => {
      expect(testColumn.addZeroFillStatement("columnDefinition", false)).toBe("columnDefinition");
    });
    
  });
  
  describe("addAutoIncrementStatement", () => {
    
    it("adds an autoIncrement statement", () => {
      expect(testColumn.addAutoIncrementStatement("columnDefinition", true)).toBe("columnDefinition AUTO_INCREMENT");
    });
    
    it("does not add an autoIncrement statement", () => {
      expect(testColumn.addAutoIncrementStatement("columnDefinition", false)).toBe("columnDefinition");
    });
    
  });
  
  describe("addPrimaryKeyStatement", () => {
    
    it("adds a primaryKey statement", () => {
      expect(testColumn.addPrimaryKeyStatement("columnDefinition", true)).toBe("columnDefinition PRIMARY KEY");
    });
    
    it("does not add a primaryKey statement", () => {
      expect(testColumn.addPrimaryKeyStatement("columnDefinition", false)).toBe("columnDefinition");
    });
    
  });
  
  describe("addAfterStatement", () => {
    
    it("adds an after statement", () => {
      expect(testColumn.addAfterStatement("columnDefinition", "addAfter", true))
        .toBe("columnDefinition AFTER addAfter");
    });
    
    it("does not add an after statement", () => {
      expect(testColumn.addAfterStatement("columnDefinition", undefined, true)).toBe("columnDefinition");
    });
    
    it("does not add an after statement when table does not exist", () => {
      expect(testColumn.addAfterStatement("columnDefinition", "addAfter", false)).toBe("columnDefinition");
      expect(Log.yellow)
        .toHaveBeenCalledWith("WARNING: addAfter option is ignored when creating a new table.");
    });
    
  });
  
});
