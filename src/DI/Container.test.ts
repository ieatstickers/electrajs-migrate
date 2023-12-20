import { Container } from "./Container";
import { DataSource } from "typeorm";
import { Modules } from "../Utility/Modules/Modules";
import { MigrationDb } from "../Dal/Migration/MigrationDb";
import * as fs from "fs";
import * as path from "path";

jest.mock("reflect-metadata", () => ({
  decorator: jest.fn()
}));

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: jest.fn(),
    Column: jest.fn(),
    Entity: jest.fn(),
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(),
      createQueryRunner: jest.fn().mockReturnValue({
        connect: jest.fn(),
        query: jest.fn(),
        release: jest.fn()
      }),
      destroy: jest.fn()
    }))
  };
});

jest.mock("fs", () => ({
  promises: {
    readdir: jest.fn()
  }
}));

jest.mock("path", () => ({
  join:    jest.fn().mockReturnValue(""),
  dirname: jest.fn().mockReturnValue(""),
  resolve: jest.fn().mockReturnValue("")
}));

jest.mock("../Utility/Modules/Modules", () => {
  return {
    Modules: {
      import: jest.fn()
    }
  };
});

jest.mock("../Dal/Migration/MigrationDb", () => {
  return {
    MigrationDb: Object.assign(jest.fn(), {
      prototype: {
        transaction: jest.fn(),
        initialize: jest.fn(),
        destroy: jest.fn(),
        getMigrationRepository: jest.fn().mockReturnValue({
          getAll: jest.fn().mockReturnValue({
            1: {
              id: 1,
              group: "group_1",
              name: "2023_01_01_000000_ExampleMigration",
              executed: "2023-01-01 00:00:00",
              batch: 1,
              created: "2023-01-01 00:00:00",
              updated: "2023-01-01 00:00:00"
            }
          })
        })
      }
    })
  };
});

describe("Container", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  
  describe("ensureMigrationDbExists", () => {
    
    it("creates a new database if it does not exist", async () => {
      const mockConfig = {
        migrationDirs:     {
          app: { name: "App", path: "./migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      const mockQueryRunner = {
        connect: jest.fn(),
        query:   jest.fn(),
        release: jest.fn()
      };
      (DataSource as jest.Mock).mockImplementation(() => ({
        initialize: jest.fn(),
        createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
        destroy: jest.fn()
      }));
      await Container.ensureMigrationDbExists();
      expect(DataSource).toHaveBeenCalled();
      expect(mockQueryRunner.connect).toHaveBeenCalled();
      expect(mockQueryRunner.query).toHaveBeenCalledWith(expect.stringContaining("CREATE DATABASE IF NOT EXISTS"));
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });
  
  describe("getMigrationDb", () => {
    
    beforeEach(() => {
      Container["migrationDb"] = undefined;
    });
    
    it("creates a new MigrationDb instance if none exists", () => {
      const mockConnectionOptions = {};
      jest.spyOn(Container, "getMigrationDbConnectionOptions" as any).mockReturnValue({});
      const migrationDb = Container.getMigrationDb();
      expect(MigrationDb).toHaveBeenCalledWith(mockConnectionOptions);
      expect(migrationDb).toBeInstanceOf(MigrationDb);
    });
    
    it("returns the same MigrationDb instance on subsequent calls", () => {
      jest.spyOn(Container, "getMigrationDbConnectionOptions" as any).mockReturnValue({});
      const firstCall = Container.getMigrationDb();
      const secondCall = Container.getMigrationDb();
      expect(MigrationDb).toHaveBeenCalledTimes(1);
      expect(firstCall).toBe(secondCall);
    });
    
    it("throws an error if the connections options aren't found in the config", () => {
      const mockConfig = {
        migrationDirs:     {
          app: {
            name: "App",
            path: "./migrations"
          }
        },
        migrationDatabase: "not_found",
        connections:{}
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      expect(() => Container.getMigrationDb())
        .toThrow(`Cannot connect to migration database - no connection found for database "not_found"`);
    });
    
    it("throws an error if multiple connections are found for the migration database", () => {
      const mockConfig = {
        migrationDirs:     {
          app: { name: "App", path: "./migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default:   {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          },
          secondary: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      expect(() => Container.getMigrationDb())
        .toThrow(`Multiple connections found for migration database "test_db"`);
    });
    
  });
  
  describe("loadConfig", () => {
    
    it("loads and validates the configuration", async () => {
      delete process.env.NODE_ENV;
      
      const mockConfig = {
        migrationDirs:     {
          app: { name: "App", path: "./migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      (Modules.import as jest.Mock).mockResolvedValue(mockConfig);
      const config = await Container.loadConfig();
      expect(Modules.import).toHaveBeenCalled();
      expect(config).toEqual(mockConfig);
    });
    
    it("loads an env specific config file correctly", async () => {
      process.env.NODE_ENV = "production";
      
      const mockConfig = {
        migrationDirs:     {
          app: { name: "App", path: "./migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      const mockProdConfig = {
        connections:       {
          default: {
            host:      "prod_host",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      let firstCall = true;
      (Modules.import as jest.Mock).mockImplementation(() => {
        if (firstCall)
        {
          firstCall = false;
          return mockProdConfig;
        }
        
        return mockConfig;
      });
      const config = await Container.loadConfig();
      expect(Modules.import).toHaveBeenCalledTimes(2);
      expect(config.migrationDirs).toEqual(mockConfig.migrationDirs);
      expect(config.migrationDatabase).toEqual(mockConfig.migrationDatabase);
      expect(config.connections).toEqual(mockProdConfig.connections);
      
      delete process.env.NODE_ENV;
    });
    
    it("throws an error if the config import fails", async () => {
      (Modules.import as jest.Mock).mockRejectedValue(new Error("Failed to import config"));
      await expect(Container.loadConfig()).rejects.toThrow("Failed to import config");
    });
    
    it("throws an error if the environment specific config import fails", async () => {
      process.env.NODE_ENV = "production";
      (Modules.import as jest.Mock).mockRejectedValue(new Error("Failed to import config"));
      await expect(Container.loadConfig()).rejects.toThrow("Failed to import config");
      delete process.env.NODE_ENV;
    });
    
    it("throws an error if the config is invalid", async () => {
      const mockConfig = {
        migrationDirs: {
          app: { name: "App", path: "./migrations" }
        },
        connections:   {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      (Modules.import as jest.Mock).mockResolvedValue(mockConfig);
      await expect(Container.loadConfig())
        .rejects
        .toThrow(`Invalid migrate.config.js file: migrationDatabase does not match schema definition. Value is required - undefined provided`);
    });
    
  });
  
  describe("getConfig", () => {
    
    it("returns the loaded configuration", () => {
      const mockConfig = {
        migrationDirs:     {
          app: { name: "App", path: "./migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host: "localhost",
            port: 3306,
            username: "user",
            password: "password",
            databases: [ "test_db" ]
          }
        }
      };
      Container["config" as any] = mockConfig;
      expect(Container.getConfig()).toBe(mockConfig);
    });
    
    it("throws an error if the config is not loaded", () => {
      Container["config"] = undefined;
      expect(() => Container.getConfig()).toThrow("Config not loaded");
    });
    
  });
  
  describe("getProjectMigrations", () => {
    
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    it("retrieves project migrations", async () => {
      const mockConfig = {
        migrationDirs:     {
          group_1: { name: "Group One", path: "./group1/migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      (fs.promises.readdir as jest.Mock).mockResolvedValue([
        "2023_01_01_000000_ExampleMigration.js",
        "2023_01_01_000001_ExampleMigration2.js"
      ]);
      (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));
      const migrationsIncExecuted = await Container.getProjectMigrations();
      expect(fs.promises.readdir).toHaveBeenCalledWith(expect.stringContaining("group1/migrations"));
      
      expect(migrationsIncExecuted).toHaveProperty("group_1");
      expect(migrationsIncExecuted.group_1.length).toBe(2);
      expect(migrationsIncExecuted.group_1[0].executed).toBe("2023-01-01 00:00:00"); // See mock at top of file
      expect(migrationsIncExecuted.group_1[1].executed).toBeNull(); // See mock at top of file
      
      const migrationsNotIncExecuted = await Container.getProjectMigrations({ includeExecuted: false });
      expect(migrationsNotIncExecuted).toHaveProperty("group_1");
      expect(migrationsNotIncExecuted.group_1.length).toBe(1);
      expect(migrationsNotIncExecuted.group_1[0].executed).toBeNull();
    });
    
    it("throws an error for invalid migration file names", async () => {
      const mockConfig = {
        migrationDirs:     {
          group_1: { name: "Group One", path: "./group1/migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      (fs.promises.readdir as jest.Mock).mockResolvedValue([ "invalid_migration.js" ]);
      await expect(Container.getProjectMigrations()).rejects.toThrow("Invalid migration file name");
    });
    
    it("throws an error for duplicate migration file name timestamps", async () => {
      const mockConfig = {
        migrationDirs:     {
          group_1: { name: "Group One", path: "./group1/migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      (fs.promises.readdir as jest.Mock).mockResolvedValue([ "2023_12_12_100000_Migration1.js", "2023_12_12_100000_Migration2.js" ]);
      (path.join as jest.Mock).mockImplementation((...args) => args.join("/"));
      await expect(Container.getProjectMigrations())
        .rejects
        .toThrow(`Duplicate migration timestamp "2023_12_12_100000" found in 2023_12_12_100000_Migration1.js and 2023_12_12_100000_Migration2.js`);
    });
    
    it("throws an error if it fails to read from a migration directory", async () => {
      const mockConfig = {
        migrationDirs:     {
          group_1: { name: "Group One", path: "./group1/migrations" }
        },
        migrationDatabase: "test_db",
        connections:       {
          default: {
            host:      "localhost",
            port:      3306,
            username:  "user",
            password:  "password",
            databases: [ "test_db" ]
          }
        }
      };
      jest.spyOn(Container, "getConfig").mockReturnValue(mockConfig);
      (fs.promises.readdir as jest.Mock).mockRejectedValue(new Error("test readdir error message"));
      await expect(Container.getProjectMigrations())
        .rejects
        .toThrow(`Failed to read migration directory ${mockConfig.migrationDirs.group_1.path}: test readdir error message`);
    });
    
  });
  
});
