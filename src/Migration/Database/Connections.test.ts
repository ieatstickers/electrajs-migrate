import { Connections } from "./Connections";
import { Connection } from "./Connection";

jest.mock("./Connection", () => {
  
  const OriginalConnection = jest.requireActual("./Connection").Connection;
  
  const mock = jest.fn().mockImplementation((config) => {
    const instance = new OriginalConnection(config);
    instance.isInitialised = jest.fn().mockReturnValue(true);
    instance.destroy = jest.fn();
    return instance;
  });
  
  // Set the prototype of the mock to match the actual class so instanceof tests work
  mock.prototype = OriginalConnection.prototype;
  
  return {
    Connection: mock
  };
});


describe("Connections", () => {
  const connectionsConfig = {
    default: {
      host:      "localhost",
      port:      3306,
      username:  "user",
      password:  "password",
      databases: [ "db1", "db2" ]
    }
  };
  let connections: Connections;
  
  beforeEach(() => {
    connections = new Connections(connectionsConfig);
  });
  
  describe("get", () => {
    
    it("returns a connection", () => {
      const connection = connections.get("default");
      expect(connection).toBeInstanceOf(Connection);
      expect(Connection).toHaveBeenCalledWith({
        host:     connectionsConfig.default.host,
        port:     connectionsConfig.default.port,
        username: connectionsConfig.default.username,
        password: connectionsConfig.default.password
      });
    });
    
    it("throws an error if the connection does not exist", () => {
      expect(() => connections.get("non-existent")).toThrowError(`Config for connection "non-existent" not found`);
    });
    
    it("returns the same connection if called multiple times", () => {
      const connection1 = connections.get("default");
      const connection2 = connections.get("default");
      expect(connection1).toBeInstanceOf(Connection);
      expect(connection2).toBeInstanceOf(Connection);
      expect(connection1).toBe(connection2);
    });
    
  });
  
  describe("getAllByDatabaseName", () => {
    
    it("returns an array of connections", () => {
      const connectionsArray = connections.getAllByDatabaseName("db1");
      expect(connectionsArray).toBeInstanceOf(Array);
      expect(connectionsArray.length).toBe(1);
      expect(connectionsArray[0]).toBeInstanceOf(Connection);
    });
    
    it("returns an empty array if no connections exist", () => {
      const connectionsArray = connections.getAllByDatabaseName("db3");
      expect(connectionsArray).toBeInstanceOf(Array);
      expect(connectionsArray.length).toBe(0);
    });
    
  });
  
  describe("destroyAllInitialised", () => {
    
    it("destroys all initialised connections", async () => {
      
      const mockConnection1 = new Connection({} as any) as jest.Mocked<Connection>;
      const mockConnection2 = new Connection({} as any) as jest.Mocked<Connection>;
      const mockConnection3 = new Connection({} as any) as jest.Mocked<Connection>;
      
      mockConnection1.isInitialised.mockReturnValue(true);
      mockConnection2.isInitialised.mockReturnValue(false);
      mockConnection3.isInitialised.mockReturnValue(true);
      (connections as any)["connections"] = {
        connection1: mockConnection1,
        connection2: mockConnection2,
        connection3: mockConnection3
      };
      
      await connections.destroyAllInitialised();
      
      expect(mockConnection1.destroy).toHaveBeenCalledTimes(1);
      expect(mockConnection2.destroy).toHaveBeenCalledTimes(0);
      expect(mockConnection3.destroy).toHaveBeenCalledTimes(1);
    });
    
  });
  
});
