import { StringColumn } from "./StringColumn";
import { StringColumnTypeEnum } from "./StringColumnTypeEnum";

describe("StringColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly with no options", () => {
      const stringColumn = new StringColumn("name");
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: false,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: undefined
      });
    });
    
    it("initializes properties correctly with options", () => {
      const stringColumn = new StringColumn("name", { nullable: true, addAfter: "otherColumn" });
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("sets length to undefined if type is not VARCHAR", () => {
      const stringColumn = new StringColumn(
        "name",
        {
          type: StringColumnTypeEnum.MEDIUMTEXT,
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.MEDIUMTEXT,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: undefined,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("sets length if type is VARCHAR", () => {
      const stringColumn = new StringColumn(
        "name",
        {
          type: StringColumnTypeEnum.VARCHAR,
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
    it("sets length if no type is passed", () => {
      const stringColumn = new StringColumn(
        "name",
        {
          nullable: true,
          addAfter: "otherColumn"
        }
      );
      expect(stringColumn).toHaveProperty("name", "name");
      expect(stringColumn).toHaveProperty("options", {
        type: StringColumnTypeEnum.VARCHAR,
        nullable: true,
        primaryKey: false,
        default: undefined,
        length: 255,
        index: false,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("getColumnDefinition", () => {
    
    it("returns the correct definition", async () => {
      const stringColumn = new StringColumn("name", { nullable: true, addAfter: "otherColumn" });
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` VARCHAR(255) NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition with length", async () => {
      const stringColumn = new StringColumn(
        "name",
        {
          type: StringColumnTypeEnum.VARCHAR,
          nullable: true,
          length: 50,
          addAfter: "otherColumn"
        }
      );
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` VARCHAR(50) NULL AFTER `otherColumn`");
    });
    
    it("returns the correct definition with default value", async () => {
      const stringColumn = new StringColumn(
        "name",
        {
          type: StringColumnTypeEnum.TEXT,
          length: 50,
          nullable: true,
          default: "default value",
          addAfter: "otherColumn"
        }
      );
      const definition = stringColumn.getColumnDefinition().get();
      expect(definition).toEqual("`name` TEXT NULL DEFAULT 'default value' AFTER `otherColumn`");
    });
    
  });
  
  describe("getIndexDefinition", () => {
    
    it("returns null if index is false", async () => {
      const stringColumn = new StringColumn("name", { nullable: true, addAfter: "otherColumn" });
      const definition = stringColumn.getIndexDefinition();
      expect(definition).toEqual(null);
    });
    
    it("returns the correct definition", async () => {
      const stringColumn = new StringColumn("name", { nullable: true, index: true, addAfter: "otherColumn" });
      const definition = stringColumn.getIndexDefinition().get();
      expect(definition).toEqual("INDEX (`name`)");
    });
    
  });
});
