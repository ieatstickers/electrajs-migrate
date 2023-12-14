import { Container } from "../../DI/Container";
import { RunCommand } from "./RunCommand";
import { Modules } from "../../Utility/Modules/Modules";
import { Log } from "../../Utility/Log/Log";

jest.mock("../../DI/Container");
jest.mock("../../Migration/Database/Connections");
jest.mock("../../Migration/Database/MySql");
jest.mock("../../Utility/Modules/Modules");
jest.mock("../../Utility/Log/Log");

class MockMigration
{
  // Mock methods and properties of the migration class
  up = jest.fn();
  down = jest.fn();
}

describe("RunCommand", () => {
  
  describe("execute", () => {
    
    beforeEach(() => {
      (Container.getConfig as jest.Mock).mockReturnValue({});
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
          getLatestBatch: jest.fn().mockReturnValue(null)
        })
      });
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });
    
    it("correctly runs multiple migrations", async () => {
      const mockMigration = new MockMigration();
      const runCommand = new RunCommand();
      // Mock getMigrationsFilesToRun response
      runCommand["getMigrationFilesToRun"] = jest.fn().mockResolvedValue([
        {
          filepath: "path/to/migration1",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration1",
          executed: null,
          batch: null
        },
        {
          filepath: "path/to/migration3",
          group: "group2",
          groupDisplayName: "Group 2",
          name: "2023_12_11_110954_Migration2",
          executed: null,
          batch: null
        },
        {
          filepath: "path/to/migration2",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110854_Migration2",
          executed: null,
          batch: null
        }
      ]);
      runCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(mockMigration);
      // Mock Modules methods
      (Modules.import as jest.Mock).mockResolvedValue({
        "Migration1": MockMigration,
        "Migration2": MockMigration
      });
      // Execute run command
      await runCommand.execute();
      expect(mockMigration.up).toHaveBeenCalledTimes(3);
      expect(Container.getMigrationDb().getMigrationRepository().save).toHaveBeenCalledTimes(3);
      expect(Log.green).toHaveBeenCalledWith("Successfully ran 3 migrations");
    });
    
    it("correctly runs a single migration", async () => {
      const mockMigration = new MockMigration();
      const runCommand = new RunCommand();
      // Mock getMigrationsFilesToRun response
      runCommand["getMigrationFilesToRun"] = jest.fn().mockResolvedValue([
        {
          filepath: "path/to/migration1",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration1",
          executed: null,
          batch: null
        }
      ]);
      runCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(mockMigration);
      // Mock Modules methods
      (Modules.import as jest.Mock).mockResolvedValue({
        "Migration1": MockMigration
      });
      // Execute run command
      await runCommand.execute();
      expect(mockMigration.up).toHaveBeenCalledTimes(1);
      expect(Container.getMigrationDb().getMigrationRepository().save).toHaveBeenCalledTimes(1);
      expect(Log.green).toHaveBeenCalledWith("Successfully ran 1 migration");
    });
    
    it("logs an error if a migration fails", async () => {
      const mockMigration = new MockMigration();
      mockMigration.up = jest.fn().mockRejectedValue(new Error("Migration failed"));
      const runCommand = new RunCommand();
      // Mock getMigrationsFilesToRun response
      runCommand["getMigrationFilesToRun"] = jest.fn().mockResolvedValue([
        {
          filepath: "path/to/migration1",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration1",
          executed: null,
          batch: null
        }
      ]);
      runCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(mockMigration);
      // Mock Container methods
      (Container.getConfig as jest.Mock).mockReturnValue({});
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
          getLatestBatch: jest.fn().mockReturnValue(null)
        })
      });
      // Mock Modules methods
      (Modules.import as jest.Mock).mockResolvedValue({
        "Migration1": MockMigration
      });
      // Execute run command
      await runCommand.execute();
      expect(mockMigration.up).toHaveBeenCalledTimes(1);
      expect(Container.getMigrationDb().getMigrationRepository().save).toHaveBeenCalledTimes(0);
      expect(Log.red).toHaveBeenCalledWith(`Failed to run migrations: Migration failed`);
    });
    
    it("logs correct error if a migration fails, rollback on error is set and there is nothing to roll back", async () => {
      const mockMigration = new MockMigration();
      mockMigration.up = jest.fn().mockRejectedValue(new Error("Migration failed"));
      const runCommand = new RunCommand({ rollbackOnError: true });
      // Mock getMigrationsFilesToRun response
      runCommand["getMigrationFilesToRun"] = jest.fn().mockResolvedValue([
        {
          filepath: "path/to/migration1",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration1",
          executed: null,
          batch: null
        }
      ]);
      runCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(mockMigration);
      // Mock Modules methods
      (Modules.import as jest.Mock).mockResolvedValue({
        "Migration1": MockMigration
      });
      // Execute run command
      await runCommand.execute();
      expect(mockMigration.up).toHaveBeenCalledTimes(1);
      expect(Container.getMigrationDb().getMigrationRepository().save).toHaveBeenCalledTimes(0);
      expect(Log.red).toHaveBeenCalledWith("Failed to run migrations: Migration failed");
      expect(Log.yellow).toHaveBeenCalledWith("Nothing to roll back - 0 migrations finished successfully.");
    });
    
    it("logs correct message if a migration fails, rollback on error is set and there is something to roll back", async () => {
      const mockMigration = new MockMigration();
      let firstRun = true;
      mockMigration.up = jest.fn().mockImplementation(async () => {
        if (firstRun)
        {
          firstRun = false;
          return;
        }
        throw new Error("Migration failed");
      });
      const runCommand = new RunCommand({ rollbackOnError: true });
      // Mock getMigrationsFilesToRun response
      runCommand["getMigrationFilesToRun"] = jest.fn().mockResolvedValue([
        {
          filepath: "path/to/migration1",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration1",
          executed: null,
          batch: null
        },
        {
          filepath: "path/to/migration2",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration2",
          executed: null,
          batch: null
        }
      ]);
      runCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(mockMigration);
      // Mock Container methods
      (Container.getConfig as jest.Mock).mockReturnValue({});
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
          getLatestBatch: jest.fn().mockReturnValue(1),
          getAllByBatch: jest.fn().mockResolvedValue([])
        })
      });
      // Mock Modules methods
      (Modules.import as jest.Mock).mockResolvedValue({
        "Migration1": MockMigration
      });
      // Execute run command
      await runCommand.execute();
      expect(mockMigration.up).toHaveBeenCalledTimes(2);
      expect(Container.getMigrationDb().getMigrationRepository().save).toHaveBeenCalledTimes(1);
      expect(Log.red).toHaveBeenCalledWith("Failed to run migrations: Migration failed");
      expect(Log.yellow).toHaveBeenCalledWith("Attempting to roll back migrations...");
    });
    
  });
  
  describe("getMigrationFilesToRun", () => {
    
    it("resolves an array of migration files in the correct order", async () => {
      (Container.getProjectMigrations as jest.Mock).mockResolvedValue({
        group1: [
          {
            filepath: "path/to/migration1",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_11_110710_Migration1",
            executed: null,
            batch: null
          },
          {
            filepath: "path/to/migration2",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_11_110854_Migration2",
            executed: null,
            batch: null
          }
        ],
        group2: [
          {
            filepath: "path/to/migration3",
            group: "group2",
            groupDisplayName: "Group 2",
            name: "2023_12_11_110711_Migration1",
            executed: null,
            batch: null
          }
        ]
      });
      const runCommand = new RunCommand();
      const filesToRun = await runCommand["getMigrationFilesToRun"]();
      expect(filesToRun).toEqual([
        {
          filepath: "path/to/migration1",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110710_Migration1",
          executed: null,
          batch: null
        },
        {
          filepath: "path/to/migration3",
          group: "group2",
          groupDisplayName: "Group 2",
          name: "2023_12_11_110711_Migration1",
          executed: null,
          batch: null
        },
        {
          filepath: "path/to/migration2",
          group: "group1",
          groupDisplayName: "Group 1",
          name: "2023_12_11_110854_Migration2",
          executed: null,
          batch: null
        }
      ]);
    });
    
  });
  
});
