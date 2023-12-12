import { MySql } from "./MySql";
import { Database } from "./Database";
import { Connections } from "./Connections";
import { Connection } from "./Connection";

jest.mock("./Connections", () => {
  return {
    Connections: jest.fn(() => {
      return {
        get: jest.fn().mockImplementation((name: string) => {
          if (name === "default") return new Connection({} as any);
          throw new Error(`Config for connection "${name}" not found`);
        }),
        getAllByDatabaseName: jest.fn().mockReturnValue([])
      };
    })
  };
});
jest.mock("./Connection", () => {
  return {
    Connection: jest.fn(() => {
      return {
        query:  jest.fn().mockResolvedValue(undefined),
        escape: jest.fn().mockImplementation((value: string) => {
          return `\`${value}\``;
        })
      };
    })
  };
});
jest.mock("./Database");

describe("MySql", () => {
  let connectionsMock;
  let mySql: MySql;
  
  beforeEach(() => {
    connectionsMock = new Connections({} as any);
    mySql = new MySql(connectionsMock);
  });
  
  test("constructor initializes connections", () => {
    expect(mySql).toHaveProperty("connections", connectionsMock);
  });
  
  describe("database", () => {
    
    it("creates a new Database instance with a single connection", async () => {
      const mockConnection = new Connection({} as any);
      connectionsMock.getAllByDatabaseName.mockReturnValue([ mockConnection ]);
      const database = mySql.database("test_db");
      expect(database).toBeInstanceOf(Database);
      expect(connectionsMock.getAllByDatabaseName).toHaveBeenCalledWith("test_db");
    });
    
    it("creates a new Database instance with a single connection when connection name is 'default'", async () => {
      const mockConnection = new Connection({} as any);
      connectionsMock.get.mockReturnValue(mockConnection);
      const database = mySql.database("test_db", "default");
      expect(database).toBeInstanceOf(Database);
      expect(connectionsMock.getAllByDatabaseName).not.toHaveBeenCalled();
      expect(connectionsMock.get).toHaveBeenCalledWith("default");
    });
    
    it("throws an error if no connections found", () => {
      connectionsMock.getAllByDatabaseName.mockReturnValue([]);
      expect(() => mySql.database("test_db")).toThrow(`No connections found for database "test_db"`);
    });
    
    it("throws an error if multiple connections found and no connection name specified", () => {
      connectionsMock.getAllByDatabaseName.mockReturnValue([ new Connection({} as any), new Connection({} as any) ]);
      
      expect(() => mySql.database("test_db"))
        .toThrow(`Multiple connections found for database "test_db". Connection name must be specified.`);
    });
    
    it("creates operation to create database if it doesn't exist", async () => {
      const connectionMock = new Connection({} as any);
      connectionsMock.getAllByDatabaseName.mockReturnValue([ connectionMock ]);
      connectionsMock.get.mockReturnValue(connectionMock);
      
      mySql.database("test_db");
      await mySql.executePendingOperations();
      
      expect(connectionMock.query).toHaveBeenNthCalledWith(1, "CREATE DATABASE IF NOT EXISTS `test_db`;");
      expect(connectionMock.query).toHaveBeenNthCalledWith(2, "USE `test_db`;");
      
      mySql.database("test_db", "default");
      await mySql.executePendingOperations();
      
      expect(connectionMock.query).toHaveBeenNthCalledWith(3, "CREATE DATABASE IF NOT EXISTS `test_db`;");
      expect(connectionMock.query).toHaveBeenNthCalledWith(4, "USE `test_db`;");
    });
    
  });
  
  describe("executePendingOperations", () => {
    
    it("executes all pending operations", async () => {
      const operationMock = jest.fn();
      mySql["operations"].push(operationMock);
      
      await mySql.executePendingOperations();
      
      expect(operationMock).toHaveBeenCalled();
      expect(mySql["operations"].length).toBe(0);
    });
    
  });
  
});
