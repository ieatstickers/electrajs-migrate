import { Container } from "../../DI/Container";
import { RollbackCommand } from "./RollbackCommand";
import { Log } from "../../Utility/Log/Log";

jest.mock("../../DI/Container");
jest.mock("../../Utility/Modules/Modules");
jest.mock("../../Utility/Log/Log");
jest.mock("../../Migration/Database/MySql");

class MockMigration
{
  up = jest.fn();
  down = jest.fn();
}

console.log = jest.fn();

describe("RollbackCommand", () => {
  
  describe("execute", () => {
    
    beforeEach(() => {
      (Container.getConfig as jest.Mock).mockReturnValue({});
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
          remove: jest.fn(),
          getLatestBatch: jest.fn(),
          getAllByBatch: jest.fn()
        })
      });
    });
    
    it("rolls back all migrations in the latest batch", async () => {
      (Container.getMigrationDb().getMigrationRepository().getLatestBatch as jest.Mock).mockReturnValue(1);
      (Container.getMigrationDb().getMigrationRepository().getAllByBatch as jest.Mock).mockReturnValue([]);
      const migrationInstance = new MockMigration();
      const rollbackCommand = new RollbackCommand();
      rollbackCommand["getMigrationsToRollBack"] = jest.fn().mockResolvedValue([
        {
          migrationRow: {
            id: 2,
            group: "group1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration2",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        },
        {
          migrationRow: {
            id: 1,
            group: "group1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration1",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        }
      ]);
      rollbackCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(migrationInstance);
      await rollbackCommand.execute();
      expect(migrationInstance.down).toHaveBeenCalledTimes(2);
      expect(Container.getMigrationDb().getMigrationRepository().remove).toHaveBeenCalledWith({
        id: 2,
        group: "group1",
        name: "2023_12_12_110000_Migration2",
        executed: "2023-12-12 11:08:11",
        batch: 1,
        created: "2023-12-12 11:08:11",
        updated: "2023-12-12 11:08:11"
      });
      expect(Container.getMigrationDb().getMigrationRepository().remove).toHaveBeenCalledWith({
        id: 1,
        group: "group1",
        name: "2023_12_12_110000_Migration1",
        executed: "2023-12-12 11:08:11",
        batch: 1,
        created: "2023-12-12 11:08:11",
        updated: "2023-12-12 11:08:11"
      });
      expect(Log.green).toHaveBeenCalledWith("Successfully rolled back 2 migrations");
    });
    
    it("logs correct message when migrations successfully run", async () => {
      (Container.getMigrationDb().getMigrationRepository().getLatestBatch as jest.Mock).mockReturnValue(1);
      (Container.getMigrationDb().getMigrationRepository().getAllByBatch as jest.Mock).mockReturnValue([]);
      const migrationInstance = new MockMigration();
      const rollbackCommand = new RollbackCommand();
      rollbackCommand["getMigrationsToRollBack"] = jest.fn().mockResolvedValue([
        {
          migrationRow: {
            id: 1,
            group: "group1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration1",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        }
      ]);
      rollbackCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(migrationInstance);
      await rollbackCommand.execute();
      expect(migrationInstance.down).toHaveBeenCalledTimes(1);
      expect(Container.getMigrationDb().getMigrationRepository().remove).toHaveBeenCalledWith({
        id: 1,
        group: "group1",
        name: "2023_12_12_110000_Migration1",
        executed: "2023-12-12 11:08:11",
        batch: 1,
        created: "2023-12-12 11:08:11",
        updated: "2023-12-12 11:08:11"
      });
      expect(Log.green).toHaveBeenCalledWith("Successfully rolled back 1 migration")
    });
    
    it("logs an error if a migration fails to roll back", async () => {
      (Container.getConfig as jest.Mock).mockReturnValue({});
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
          remove: jest.fn(),
          getLatestBatch: jest.fn().mockReturnValue(1),
          getAllByBatch: jest.fn().mockReturnValue([])
        })
      });
      const migrationInstance = new MockMigration();
      migrationInstance.down = jest.fn().mockRejectedValue(new Error("Something went wrong"));
      const rollbackCommand = new RollbackCommand();
      rollbackCommand["getMigrationsToRollBack"] = jest.fn().mockResolvedValue([
        {
          migrationRow: {
            id: 2,
            group: "group1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration2",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        }
      ]);
      rollbackCommand["getMigrationClassInstance"] = jest.fn().mockResolvedValue(migrationInstance);
      await rollbackCommand.execute();
      expect(migrationInstance.down).toHaveBeenCalledTimes(1);
      expect(Log.red).toHaveBeenCalledWith("Failed to roll back migrations: Something went wrong");
    });
    
  });
  
  describe("getMigrationsToRollBack", () => {
    
    beforeEach(() => {
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          save: jest.fn(),
          remove: jest.fn(),
          getLatestBatch: jest.fn().mockReturnValue(1),
          getAllByBatch: jest.fn().mockReturnValue([
            {
              id: 1,
              group: "group1",
              name: "2023_12_12_110000_Migration1",
              executed: "2023-12-12 11:08:11",
              batch: 1,
              created: "2023-12-12 11:08:11",
              updated: "2023-12-12 11:08:11"
            },
            {
              id: 2,
              group: "group1",
              name: "2023_12_12_110000_Migration2",
              executed: "2023-12-12 11:08:11",
              batch: 1,
              created: "2023-12-12 11:08:11",
              updated: "2023-12-12 11:08:11"
            },
            {
              id: 3,
              group: "group1",
              name: "2023_12_12_100000_Migration3",
              executed: "2023-12-12 11:08:11",
              batch: 1,
              created: "2023-12-12 11:08:11",
              updated: "2023-12-12 11:08:11"
            }
          ])
        })
      });
    });
    
    afterEach(() => {
      jest.clearAllMocks();
    });
    
    it("returns an empty array if no latest batch is found", async () => {
      (Container.getMigrationDb as jest.Mock).mockReturnValue({
        getMigrationRepository: jest.fn().mockReturnValue({
          getLatestBatch: jest.fn().mockReturnValue(null)
        })
      });
      const rollbackCommand = new RollbackCommand();
      const migrationsToRollBack = await rollbackCommand["getMigrationsToRollBack"]();
      expect(migrationsToRollBack).toEqual([]);
    });
    
    it("returns an array of files and rows in the correct order", async () => {
      (Container.getProjectMigrations as jest.Mock).mockResolvedValue({
        group1: [
          {
            filepath: "path/to/migration1",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1
          },
          {
            filepath: "path/to/migration2",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1
          },
          {
            filepath: "path/to/migration3",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_100000_Migration3",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        ]
      });
      const rollbackCommand = new RollbackCommand();
      const migrationsToRollBack = await rollbackCommand["getMigrationsToRollBack"]();
      expect(migrationsToRollBack).toEqual([
        {
          migrationRow: {
            id: 2,
            group: "group1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration2",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration2",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        },
        {
          migrationRow: {
            id: 1,
            group: "group1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration1",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        },
        {
          migrationRow: {
            id: 3,
            group: "group1",
            name: "2023_12_12_100000_Migration3",
            executed: "2023-12-12 11:08:11",
            batch: 1,
            created: "2023-12-12 11:08:11",
            updated: "2023-12-12 11:08:11"
          },
          migrationFile: {
            filepath: "path/to/migration3",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_100000_Migration3",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        }
      ]);
    });
    
    it("throws an error if a migration file cannot be found for a migration row", async () => {
      (Container.getProjectMigrations as jest.Mock).mockResolvedValue({
        group1: [
          {
            filepath: "path/to/migration1",
            group: "group1",
            groupDisplayName: "Group 1",
            name: "2023_12_12_110000_Migration1",
            executed: "2023-12-12 11:08:11",
            batch: 1
          }
        ]
      });
      const rollbackCommand = new RollbackCommand();
      const promise = rollbackCommand["getMigrationsToRollBack"]();
      await expect(promise).rejects.toThrow("Could not find migration file for 2023_12_12_110000_Migration2 in group group1");
    });
    
  });
  
});
