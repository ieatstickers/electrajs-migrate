import { BlobColumn } from "./BlobColumn";
import { BlobColumnTypeEnum } from "./BlobColumnTypeEnum";
import { Connection } from "../../Database/Connection";
import { Log } from "../../../Utility/Log/Log";

jest.mock("../../../Utility/Log/Log");
jest.mock("../../Database/Connection", () => {
  return {
    Connection: jest.fn().mockImplementation(() => ({
      escape: jest.fn().mockImplementation(async (value: string) => `\`${value}\``),
      query: jest.fn()
    }))
  };
});


describe("BlobColumn", () => {
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const blobColumn = new BlobColumn("imageContent", { nullable: true, addAfter: "otherColumn" });
      expect(blobColumn).toHaveProperty("name", "imageContent");
      expect(blobColumn).toHaveProperty("options", {
        type: BlobColumnTypeEnum.BLOB,
        nullable: true,
        addAfter: "otherColumn"
      });
    });
    
  });
  
  describe("create", () => {
    
    it("create method constructs and executes SQL query for new table", async () => {
      const mockConnection = new Connection({} as any);
      const blobColumn = new BlobColumn("imageContent", { nullable: true, addAfter: "otherColumn" });
      await blobColumn.create(mockConnection, "test_table", true);
      expect(mockConnection.escape).toHaveBeenCalledWith("imageContent");
      expect(mockConnection.escape).toHaveBeenCalledWith("test_table");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("CREATE TABLE"));
    });
    
    it("create method constructs and executes SQL query for existing table", async () => {
      const mockConnection = new Connection({} as any);
      const blobColumn = new BlobColumn("imageContent", { nullable: true, addAfter: "otherColumn" });
      await blobColumn.create(mockConnection, "testTable", false);
      
      expect(mockConnection.escape).toHaveBeenCalledWith("imageContent");
      expect(mockConnection.escape).toHaveBeenCalledWith("testTable");
      expect(mockConnection.query).toHaveBeenCalledWith(expect.stringContaining("ALTER TABLE"));
    });
    
  });
  
  describe("generates correct SQL query based on options", () => {
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    const testCases = [
      {
        name: "logs warning when addAfter is set but createTable is true",
        createTable: true,
        warning: "WARNING: addAfter option is ignored when creating a new table.",
        query: "CREATE TABLE `test_table` (`imageContent` BLOB NOT NULL);",
        options: {
          addAfter: "afterColumnName"
        }
      },
      {
        name: "type override works correctly",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `imageContent` MEDIUMBLOB NOT NULL;",
        options:     {
          type: BlobColumnTypeEnum.MEDIUMBLOB
        }
      },
      {
        name: "all options are set",
        createTable: true,
        query: "CREATE TABLE `test_table` (`imageContent` MEDIUMBLOB NULL);",
        options: {
          type: BlobColumnTypeEnum.MEDIUMBLOB,
          nullable: true,
          addAfter: "afterColumnName"
        }
      },
      {
        name: "nullable set to false",
        createTable: false,
        query: "ALTER TABLE `test_table` ADD COLUMN `imageContent` BLOB NOT NULL;",
        options: {
          type: BlobColumnTypeEnum.BLOB,
          nullable: false
        }
      }
    ];
    
    for (const testCase of testCases)
    {
      test(testCase.name, async () => {
        const mockConnection = new Connection({} as any);
        const blobColumn = new BlobColumn("imageContent", testCase.options);
        await blobColumn.create(mockConnection, "test_table", testCase.createTable);
        if (testCase.warning) expect(Log.yellow).toHaveBeenCalledWith(testCase.warning);
        expect(mockConnection.query).toHaveBeenCalledWith(testCase.query);
      });
    }
    
  });
  
});
