import { Modules } from "../Utility/Modules";
import { AbstractMigrateCommand } from "./AbstractMigrateCommand";
import { MigrationFile } from "../Type/MigrationFile";
import { MigrationInterface } from "../Migration/MigrationInterface";

jest.mock("../Utility/Modules");

class MockMigration
{
  up = () => "test";
  down = () => "test";
}

class ConcreteMigrateCommand extends AbstractMigrateCommand
{
  public async execute(): Promise<void> {}
  
  public async getMigrationClassInstance(migration: MigrationFile): Promise<MigrationInterface>
  {
    return super.getMigrationClassInstance(migration);
  }
}

describe("AbstractMigrateCommand", () => {
  
  describe("getMigrationClassInstance", () => {
    
    it("correctly returns a named export", async () => {
      (Modules.import as jest.Mock).mockResolvedValue({
        "MockMigration": MockMigration
      });
      const migrationFile = {
        name: "2023_01_01_103054_MockMigration",
        filepath: "path/to/migration",
        group: "test",
        groupDisplayName: "Test",
        executed: null,
        batch: 1
      };
      const concreteCommand = new ConcreteMigrateCommand();
      const classFromModule = await concreteCommand.getMigrationClassInstance(migrationFile);
      expect(classFromModule).toBeInstanceOf(MockMigration);
    });
    
    it("correctly returns a default export", async () => {
      (Modules.import as jest.Mock).mockResolvedValue({
        "default": MockMigration
      });
      const migrationFile = {
        name: "2023_01_01_103054_MockMigration",
        filepath: "path/to/migration",
        group: "test",
        groupDisplayName: "Test",
        executed: null,
        batch: 1
      };
      const concreteCommand = new ConcreteMigrateCommand();
      const classFromModule = await concreteCommand.getMigrationClassInstance(migrationFile);
      expect(classFromModule).toBeInstanceOf(MockMigration);
    });
    
    it("throws an error if there are no matching exports found", async () => {
      (Modules.import as jest.Mock).mockResolvedValue({});
      
      const migrationFile = {
        name: "2023_01_01_103054_MockMigration",
        filepath: "path/to/migration",
        group: "test",
        groupDisplayName: "Test",
        executed: null,
        batch: 1
      };
      const concreteCommand = new ConcreteMigrateCommand();
      await expect(concreteCommand.getMigrationClassInstance(migrationFile)).rejects
        .toThrow(`Could not find migration class in ${migrationFile.filepath}`);
    });
    
    it("uses Modules.require if Modules.isCommonJS returns true", async () => {
      (Modules.isCommonJS as jest.Mock).mockResolvedValue(true);
      (Modules.require as jest.Mock).mockReturnValue({
        "MockMigration": MockMigration
      });
      const migrationFile = {
        name: "2023_01_01_103054_MockMigration",
        filepath: "path/to/migration",
        group: "test",
        groupDisplayName: "Test",
        executed: null,
        batch: 1
      };
      const concreteCommand = new ConcreteMigrateCommand();
      await concreteCommand.getMigrationClassInstance(migrationFile);
      expect(Modules.require).toHaveBeenCalledWith(migrationFile.filepath);
    });
    
    it("uses Modules.import if Modules.isCommonJS returns false", async () => {
      (Modules.isCommonJS as jest.Mock).mockResolvedValue(false);
      (Modules.import as jest.Mock).mockReturnValue({
        "MockMigration": MockMigration
      });
      const migrationFile = {
        name: "2023_01_01_103054_MockMigration",
        filepath: "path/to/migration",
        group: "test",
        groupDisplayName: "Test",
        executed: null,
        batch: 1
      };
      const concreteCommand = new ConcreteMigrateCommand();
      await concreteCommand.getMigrationClassInstance(migrationFile);
      expect(Modules.import).toHaveBeenCalledWith(migrationFile.filepath);
    });
    
  });
  
});
