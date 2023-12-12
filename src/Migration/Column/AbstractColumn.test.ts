import { AbstractColumn } from "./AbstractColumn";
import { Schema, Validators } from "@electra/utility";
import { Connection } from "../Database/Connection";
import chalk from "chalk";

class TestColumn extends AbstractColumn
{
  async create(connection: Connection, tableName: string, createTable: boolean): Promise<void> {}
  
  public testValidateName(name: string): boolean
  {
    return this.validateName(name);
  }
  
  public testValidateOptions(options: any, schema: Schema): boolean
  {
    return this.validateOptions(options, schema);
  }
}

console.warn = jest.fn();

describe("AbstractColumn", () => {
  let testColumn;
  
  beforeEach(() => {
    testColumn = new TestColumn();
  });
  
  describe("validateName", () => {
    
    it("validates a valid name", () => {
      expect(testColumn.testValidateName("validName")).toBe(true);
    });
    
    it("throws an error for an invalid name", () => {
      expect(() => testColumn.testValidateName("")).toThrow(TypeError);
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
      expect(testColumn.addIndexStatement("columnDefinition", true)).toBe("columnDefinition INDEX");
    });
    
    it("does not add an index statement", () => {
      expect(testColumn.addIndexStatement("columnDefinition", false)).toBe("columnDefinition");
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
      expect(console.warn)
        .toHaveBeenCalledWith(chalk.yellowBright("WARNING: addAfter option is ignored when creating a new table."));
    });
    
  });
  
});
