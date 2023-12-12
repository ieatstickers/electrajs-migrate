import { Database } from "./Database";
import { Table } from "./Table";
import { Connection } from "./Connection";

jest.mock("./Table");
jest.mock("./Connection");

describe("Database", () => {
  let mockConnection: Connection;
  let database: Database;
  let operations: Array<() => Promise<void>>;
  
  beforeEach(() => {
    mockConnection = new Connection({} as any);
    database = new Database(mockConnection, operations);
    operations = [];
  });
  
  describe("constructor", () => {
    
    it("initializes connection and operations", () => {
      expect(database).toHaveProperty("connection", mockConnection);
      expect(database["connection"]).toBe(mockConnection);
      expect(database).toHaveProperty("operations", operations);
      expect(database["operations"]).toBe(operations);
    });
    
  });
  
  describe("create", () => {
    
    it("returns a new Table instance", () => {
      const tableName = "test_table";
      const table = database.create(tableName);
      expect(table).toBeInstanceOf(Table);
      expect(Table).toHaveBeenCalledWith(tableName, mockConnection, operations, false);
    });
    
  });
  
  describe("table", () => {
    
    it("returns a new Table instance", () => {
      const tableName = "test_table";
      const table = database.table(tableName);
      expect(table).toBeInstanceOf(Table);
      expect(Table).toHaveBeenCalledWith(tableName, mockConnection, operations, true);
    });
    
  });
  
});
