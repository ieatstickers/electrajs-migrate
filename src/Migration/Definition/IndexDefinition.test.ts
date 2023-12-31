import { IndexDefinition } from "./IndexDefinition";
import { IndexDefinitionTypeEnum } from "./Enum/IndexDefinitionTypeEnum";

describe("IndexDefinition", () => {
  let testIndexDefinition: IndexDefinition;
  
  beforeEach(() => {
    testIndexDefinition = new IndexDefinition();
  });
  
  describe("constructor", () => {
    
    it("sets default values", () => {
      expect(testIndexDefinition).not.toHaveProperty("indexName");
      expect(testIndexDefinition).toHaveProperty("indexColumns", []);
      expect(testIndexDefinition).toHaveProperty("indexType", IndexDefinitionTypeEnum.INDEX);
    });
    
  });
  
  describe("create", () => {
    
    it("creates a new index definition", () => {
      const indexDefinition = IndexDefinition.create();
      expect(indexDefinition).toBeInstanceOf(IndexDefinition);
    });
    
  });
  
  describe("isDrop", () => {
    
    it("returns the dropIndex property", () => {
      expect(testIndexDefinition.isDrop()).toBe(false);
      testIndexDefinition.columns('testColumn').drop();
      expect(testIndexDefinition.isDrop()).toBe(true);
    });
    
  });
  
  describe("drop", () => {
    
    it("sets the dropIndex property", () => {
      testIndexDefinition.name('test_index_name').columns('test').drop();
      expect(testIndexDefinition).toHaveProperty("dropIndex", true);
      expect(testIndexDefinition.get()).toBe("INDEX `test_index_name`");
    });
    
  });
  
  describe("defaultName", () => {
    
    it("sets the default index name", () => {
      testIndexDefinition.defaultName("testName");
      expect(testIndexDefinition).toHaveProperty("defaultIndexName", "testName");
      expect(() => testIndexDefinition.get()).toThrow("No columns defined for index");
    });
    
  });
  
  describe("name", () => {
    
    it("sets the index name", () => {
      testIndexDefinition.name("testName");
      expect(testIndexDefinition).toHaveProperty("indexName", "testName");
      expect(() => testIndexDefinition.get()).toThrow("No columns defined for index");
    });
    
  });
  
  describe("columns", () => {
    
    it("sets the index columns", () => {
      testIndexDefinition.columns("testColumn");
      expect(testIndexDefinition).toHaveProperty("indexColumns", ["testColumn"]);
      testIndexDefinition.columns("testColumn2");
      expect(testIndexDefinition).toHaveProperty("indexColumns", ["testColumn", "testColumn2"]);
    });
    
  });
  
  describe("type", () => {
    
    it("sets the index type", () => {
      testIndexDefinition.type(IndexDefinitionTypeEnum.UNIQUE);
      expect(testIndexDefinition).toHaveProperty("indexType", IndexDefinitionTypeEnum.UNIQUE);
    });
    
  });
  
  describe("get", () => {
    
    it("returns the index definition", () => {
      testIndexDefinition.name("testName").columns("testColumn");
      expect(testIndexDefinition.get()).toBe("INDEX `testName` (`testColumn`)");
    });
    
    it("returns the index definition for UNIQUE", () => {
      testIndexDefinition.name("testName").type(IndexDefinitionTypeEnum.UNIQUE).columns("testColumn");
      expect(testIndexDefinition.get()).toBe("UNIQUE INDEX `testName` (`testColumn`)");
    });
    
    it("throws an error if no name is defined and dropIndex is true", () => {
      expect(() => testIndexDefinition.columns("test").drop().get()).toThrow("No index name defined for drop index");
    });
    
  });
  
});
