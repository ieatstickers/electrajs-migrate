import { Container } from "../../DI/Container";
import { NewCommand } from "./NewCommand";
import { Log } from "../../Utility/Log/Log";
const fs = require('fs');

jest.mock("../../Utility/Log/Log");
jest.mock("../../DI/Container");
jest.mock("fs", () => {
  return {
    promises: {
      writeFile: jest.fn()
    }
  }
});

describe("NewCommand", () => {
  
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  
  describe("constructor", () => {
    
    it("initializes properties correctly", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app", 'ts');
      expect(newCommand).toHaveProperty("migrationName", "CreateUsersTable");
      expect(newCommand).toHaveProperty("migrationDir", "app");
      expect(newCommand).toHaveProperty("type", "ts");
    });
    
  });
  
  describe("execute", () => {
    
    it("Logs error if multiple migration dirs specified and no migration dir specified", async () => {
      const newCommand = new NewCommand("CreateUsersTable");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          },
          other: {
            path: 'other'
          }
        }
      } as any);
      await newCommand.execute();
      expect(Log.red).toHaveBeenCalledTimes(1);
      expect(Log.red).toHaveBeenCalledWith("Migration directory must be specified when multiple migration directories are configured.");
    });
    
    it("Logs error if migration name is invalid", async () => {
      const newCommand = new NewCommand("Create Users Table");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      await newCommand.execute();
      expect(Log.red).toHaveBeenCalledTimes(1);
      expect(Log.red).toHaveBeenCalledWith("Invalid migration name: Create Users Table. Must be a string with no spaces.");
    });
    
    it("Logs error if migration dir is specified but it's not in the config", async () => {
      const newCommand = new NewCommand("CreateUsersTable", "other");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      await newCommand.execute();
      expect(Log.red).toHaveBeenCalledTimes(1);
      expect(Log.red).toHaveBeenCalledWith("Invalid migration directory: other");
    });
    
    it("correctly writes the migration file when migration dir is specified", async () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      jest.spyOn(newCommand as any, 'getFileTemplate').mockReturnValue('template');
      jest.spyOn(newCommand as any, 'getMigrationFileName').mockReturnValue('2024_01_01_000000_CreateUsersTable.ts');
      await newCommand.execute();
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.promises.writeFile).toHaveBeenCalledWith('app/2024_01_01_000000_CreateUsersTable.ts', 'template');
      expect(Log.green).toHaveBeenCalledTimes(1);
      expect(Log.green).toHaveBeenCalledWith("Created migration file: app/2024_01_01_000000_CreateUsersTable.ts");
    });
    
    it("correctly writes the migration file when migration dir is not specified", async () => {
      const newCommand = new NewCommand("CreateUsersTable");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      jest.spyOn(newCommand as any, 'getFileTemplate').mockReturnValue('template');
      jest.spyOn(newCommand as any, 'getMigrationFileName').mockReturnValue('2024_01_01_000000_CreateUsersTable.ts');
      await newCommand.execute();
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.promises.writeFile).toHaveBeenCalledWith('app/2024_01_01_000000_CreateUsersTable.ts', 'template');
      expect(Log.green).toHaveBeenCalledTimes(1);
      expect(Log.green).toHaveBeenCalledWith("Created migration file: app/2024_01_01_000000_CreateUsersTable.ts");
    });
    
    it("correctly writes a ts migration file", async () => {
      const newCommand = new NewCommand("CreateUsersTable");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      jest.spyOn(newCommand as any, 'getFileTemplate').mockReturnValue('template');
      jest.spyOn(newCommand as any, 'getMigrationFileName').mockReturnValue('2024_01_01_000000_CreateUsersTable.ts');
      process.env.MIGRATE_TS = "true";
      await newCommand.execute();
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.promises.writeFile).toHaveBeenCalledWith('app/2024_01_01_000000_CreateUsersTable.ts', 'template');
      expect(Log.green).toHaveBeenCalledTimes(1);
      expect(Log.green).toHaveBeenCalledWith("Created migration file: app/2024_01_01_000000_CreateUsersTable.ts");
      delete process.env.MIGRATE_TS;
    });
    
    it("correctly writes a js migration file", async () => {
      const newCommand = new NewCommand("CreateUsersTable");
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      jest.spyOn(newCommand as any, 'getFileTemplate').mockReturnValue('template');
      jest.spyOn(newCommand as any, 'getMigrationFileName').mockReturnValue('2024_01_01_000000_CreateUsersTable.js');
      process.env.MIGRATE_TS = "false";
      await newCommand.execute();
      expect(fs.promises.writeFile).toHaveBeenCalledTimes(1);
      expect(fs.promises.writeFile).toHaveBeenCalledWith('app/2024_01_01_000000_CreateUsersTable.js', 'template');
      expect(Log.green).toHaveBeenCalledTimes(1);
      expect(Log.green).toHaveBeenCalledWith("Created migration file: app/2024_01_01_000000_CreateUsersTable.js");
      delete process.env.MIGRATE_TS;
    });
    
    it("correctly uses the type option", async () => {
      const newCommand = new NewCommand("CreateUsersTable", "app", 'js');
      jest.spyOn(Container, 'getConfig').mockReturnValue({
        migrationDirs: {
          app: {
            path: 'app'
          }
        }
      } as any);
      process.env.MIGRATE_TS = "true";
      jest.spyOn(newCommand as any, 'getFileTemplate').mockReturnValue('template');
      jest.spyOn(newCommand as any, 'getMigrationFileName').mockReturnValue('2024_01_01_000000_CreateUsersTable.js');
      await newCommand.execute();
      expect(newCommand['getFileTemplate']).toHaveBeenCalledWith(false, null);
      expect(newCommand['getMigrationFileName']).toHaveBeenCalledWith('js');
      expect(fs.promises.writeFile).toHaveBeenCalledWith('app/2024_01_01_000000_CreateUsersTable.js', 'template');
      delete process.env.MIGRATE_TS;
    });
  
  });
  
  describe("getFileTemplate", () => {
  
    it("returns TS template when useTs is true", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      jest.spyOn(newCommand as any, 'getTsMigrationTemplate').mockReturnValue('ts template');
      const template = newCommand['getFileTemplate'](true, null);
      expect(newCommand['getTsMigrationTemplate']).toHaveBeenCalledTimes(1);
      expect(template).toBe('ts template');
    });
    
    it("returns MJS template when useTs is false and module is mjs", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      jest.spyOn(newCommand as any, 'getMjsMigrationTemplate').mockReturnValue('mjs template');
      const template = newCommand['getFileTemplate'](false, 'mjs');
      expect(newCommand['getMjsMigrationTemplate']).toHaveBeenCalledTimes(1);
      expect(template).toBe('mjs template');
    });
    
    it("returns CJS template when useTs is false and module is cjs", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      jest.spyOn(newCommand as any, 'getCjsMigrationTemplate').mockReturnValue('cjs template');
      const template = newCommand['getFileTemplate'](false, 'cjs');
      expect(newCommand['getCjsMigrationTemplate']).toHaveBeenCalledTimes(1);
      expect(template).toBe('cjs template');
    });
  
  });
  
  describe("getMigrationFileName", () => {
    
    it("returns correct file name for TS", () => {
      const originalDate = Date;
      jest.spyOn(global, 'Date').mockImplementation(() => new originalDate('2024-01-01T00:00:00Z'));
      const newCommand = new NewCommand("CreateUsersTable", "app");
      expect(newCommand['getMigrationFileName']('ts')).toBe('2024_01_01_000000_CreateUsersTable.ts');
    });
    
  });
  
  describe("getTypeScriptTemplate", () => {
    
    it("returns correct template", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      const tsTemplate = newCommand['getTsMigrationTemplate']();
      expect(tsTemplate).toContain('export class MigrationName');
      expect(tsTemplate).toContain('public up(mysql: MySql)');
      expect(tsTemplate).toContain('public down(mysql: MySql)');
    });
    
  });
  
  describe("getMjsTemplate", () => {
    
    it("returns correct template", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      const tsTemplate = newCommand['getMjsMigrationTemplate']();
      expect(tsTemplate).toContain('export class MigrationName');
      expect(tsTemplate).toContain('up(mysql)');
      expect(tsTemplate).toContain('down(mysql)');
    });
    
  });
  
  describe("getCjsMigrationTemplate", () => {
    
    it("returns correct template", () => {
      const newCommand = new NewCommand("CreateUsersTable", "app");
      const tsTemplate = newCommand['getCjsMigrationTemplate']();
      expect(tsTemplate).toContain('module.exports = class MigrationName');
      expect(tsTemplate).toContain('up(mysql)');
      expect(tsTemplate).toContain('down(mysql)');
    });
    
  });
  
});
