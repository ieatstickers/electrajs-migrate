import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
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
    const migrationDirs = Container.getConfig().migrationDirs;
    const migrationDirKeys = Object.keys(migrationDirs);
    
    if (migrationDirKeys.length > 1 && !this.migrationDir)
    {
      Log.red(`Migration directory must be specified when multiple migration directories are configured.`);
      return;
    }
    
    if (/[A-z]+/.test(this.migrationName) === false)
    {
      Log.red(`Invalid migration name: ${this.migrationName}. Must be a string with no spaces.`);
      return;
    }
    
    if (migrationDirKeys.length > 1 && migrationDirKeys.includes(this.migrationDir) === false)
    {
      Log.red(`Invalid migration directory: ${this.migrationDir}`);
      return;
    }
    
    const useTs = process.env.MIGRATE_TS === "true";
    const jsModuleType = process.env.MIGRATE_JS_MODULE_TYPE || null;
    let template: string;
    
    if (useTs)
    {
      template = this.getTypeScriptTemplate();
    }
    else if (jsModuleType === 'mjs')
    {
      template = this.getMjsTemplate();
    }
    else
    {
      template = this.getCjsMigrationTemplate();
    }
    
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
  
  private getTypeScriptTemplate()
  {
    return `
      import { AbstractMigration, MySql } from "@electra/migrate";

      export class MigrationName extends AbstractMigration
      {
        public up(mysql: MySql)
        {
      
        }
      
        public down(mysql: MySql)
        {
        
        }
      }

    `;
  }
  
  private getMjsTemplate()
  {
    return `
      import { AbstractMigration } from "@electra/migrate";

      export class MigrationName extends AbstractMigration
      {
        up(mysql)
        {
      
        }
      
        down(mysql)
        {
      
        }
      }
    `;
  }
  
  private getCjsMigrationTemplate()
  {
    return `
      const { AbstractMigration } = require("@electra/migrate");

      module.exports = class MigrationName extends AbstractMigration
      {
        up(mysql)
        {
      
        }
      
        down(mysql)
        {
      
        }
      }
    `;
  }
}
