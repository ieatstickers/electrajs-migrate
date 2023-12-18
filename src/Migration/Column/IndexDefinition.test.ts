import { IndexDefinition } from "./IndexDefinition";
import { IndexDefinitionType } from "./IndexDefinitionType";

describe("IndexDefinition", () => {
  let testIndexDefinition: IndexDefinition;
  
  beforeEach(() => {
    testIndexDefinition = new IndexDefinition();
  });
  
  describe("constructor", () => {
    
    it("sets default values", () => {
      expect(testIndexDefinition).not.toHaveProperty("indexName");
      expect(testIndexDefinition).toHaveProperty("indexColumns", []);
      expect(testIndexDefinition).toHaveProperty("indexType", IndexDefinitionType.INDEX);
    });
    
  });
  
  describe("create", () => {
    
    it("creates a new index definition", () => {
      const indexDefinition = IndexDefinition.create();
      expect(indexDefinition).toBeInstanceOf(IndexDefinition);
    });
    
  });
  
  describe("defaultName", () => {
    
    it("sets the default index name", () => {
      console.log('testIndexDefinition', testIndexDefinition);
      testIndexDefinition.defaultName("testName");
      expect(testIndexDefinition).toHaveProperty("defaultIndexName", "testName");
      expect(() => testIndexDefinition.get()).toThrow("No columns defined for index");
    });
    
  });
  
  describe("name", () => {
    
    it("sets the index name", () => {
      console.log('testIndexDefinition', testIndexDefinition);
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
      testIndexDefinition.type(IndexDefinitionType.UNIQUE);
      expect(testIndexDefinition).toHaveProperty("indexType", IndexDefinitionType.UNIQUE);
    });
    
  });
  
  describe("get", () => {
    
    it("returns the index definition", () => {
      testIndexDefinition.name("testName").columns("testColumn");
      expect(testIndexDefinition.get()).toBe("INDEX `testName` (`testColumn`)");
    });
    
    it("returns the index definition for UNIQUE", () => {
      testIndexDefinition.name("testName").type(IndexDefinitionType.UNIQUE).columns("testColumn");
      expect(testIndexDefinition.get()).toBe("UNIQUE INDEX `testName` (`testColumn`)");
    });
    
  });
  
});
