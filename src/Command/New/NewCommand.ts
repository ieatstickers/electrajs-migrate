import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs";
import { Log } from "../../Utility/Log/Log";

export class NewCommand extends AbstractMigrateCommand
{
  private readonly migrationName: string;
  private readonly migrationDir: string;
  
  public constructor(migrationName: string, migrationDir: string)
  {
    super();
    this.migrationName = migrationName;
    this.migrationDir = migrationDir;
  }
  
  public async execute(): Promise<void>
  {
    if (/[A-z]+/.test(this.migrationName) === false)
    {
      throw new Error(`Invalid migration name: ${this.migrationName}. Must be a string with no spaces.`);
    }
    
    const migrationDirs = Container.getConfig().migrationDirs;
    const migrationDirKeys = Object.keys(migrationDirs);
    
    if (migrationDirKeys.length > 1 && migrationDirKeys.includes(this.migrationDir) === false)
    {
      throw new Error(`Invalid migration directory: ${this.migrationDir}`);
    }
    
    const useTs = process.env.MIGRATE_TS === "true";
    const jsModuleType = process.env.MIGRATE_JS_MODULE_TYPE || null;
    const templateFilePath = `${this.getCurrentDir()}/Migration.${useTs ? 'ts' : jsModuleType}.txt`;
    
    const template = await fs.promises.readFile(templateFilePath, { encoding: 'utf-8' });
    const fileContents = template.replace(/MigrationName/g, this.migrationName);
    
    const migrationDir = migrationDirs[this.migrationDir || migrationDirKeys[0]].path;
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timestampFileNamePrefix = `${year}_${month}_${day}_${hours}${minutes}${seconds}`;
    const migrationFilePath = `${migrationDir}/${timestampFileNamePrefix}_${this.migrationName}.${useTs ? 'ts' : 'js'}`;
    
    await fs.promises.writeFile(migrationFilePath, fileContents);
    
    Log.green(`Created migration file: ${migrationFilePath}`);
  }
  
  private getCurrentDir()
  {
    if (!import.meta.url) return __dirname;
    const __filename = fileURLToPath(import.meta.url);
    return dirname(__filename);
  }
}
