import { Connection } from "./Connection";
import { DataSource } from "typeorm";

jest.mock("typeorm", () => {
  return {
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(),
      query:      jest.fn(),
      destroy:    jest.fn(),
      driver:     {
        escape: jest.fn().mockImplementation((name: string) => `escaped-${name}`)
      }
    }))
  };
});

describe("Connection", () => {
  
  const connectionConfig = {
    host:     "localhost",
    port:     3306,
    username: "user",
    password: "password"
  };
  let connection: Connection;
  
  beforeEach(() => {
    connection = new Connection(connectionConfig);
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe("query", () => {
    
    it("executes a query", async () => {
      const query = "SELECT * FROM `users`;";
      await connection.query(query);
      expect((DataSource as jest.Mock).mock.results[0].value.query).toHaveBeenCalledWith(query, []);
    });
    
  });
  
  describe("destroy", () => {
    
    it("destroys the connection", async () => {
      await connection.query("SELECT * FROM `users`;");
      await connection.destroy();
      expect((DataSource as jest.Mock).mock.results[0].value.destroy).toHaveBeenCalledTimes(1);
    });
    
  });
  
  describe("isInitialised", () => {
    
    it("returns true if the connection has been initialised", async () => {
      await connection.query("SELECT * FROM `users`;");
      expect(connection.isInitialised()).toBe(true);
    });
    
    it("returns false if the connection has not been initialised", () => {
      expect(connection.isInitialised()).toBe(false);
    });
    
  });
  
  describe("escape", () => {
    
    it("escapes a string", async () => {
      const name = "users";
      const escaped = await connection.escape(name);
      expect((DataSource as jest.Mock).mock.results[0].value.driver.escape).toHaveBeenCalledWith(name);
      expect(escaped).toBe(`escaped-${name}`);
    });
    
  });
  
});
