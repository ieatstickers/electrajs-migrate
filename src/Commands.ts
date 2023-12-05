import { Container } from "./DI/Container";
import { MigrationFile } from "./Type/MigrationFile";
import { DateTime } from "luxon";
import { Migration } from "./Database/Migration/Repository/Migration/Migration";
import { MigrationInterface } from "./Migration/MigrationInterface";
import { MySql } from "./Migration/Database/MySql";
import { Connections } from "./Migration/Database/Connections";
import chalk from "chalk";
import { Modules } from "./Utility/Modules";

export class Commands
{
  public static async status(): Promise<void>
  {
    const migrationDirs = Container.getConfig().migrationDirs;
    const migrationFilesByGroup = await Container.getProjectMigrations();
    
    for (const groupKey in migrationFilesByGroup)
    {
      const migrationFiles: Array<MigrationFile> = migrationFilesByGroup[groupKey];
      const { name: groupDisplayName } = migrationDirs[groupKey];
      
      console.log(chalk.yellowBright(groupDisplayName));
      
      if (migrationFiles.length === 0)
      {
        console.log(chalk.redBright('  * No migrations found *'));
        continue;
      }
      
      for (const migrationFile of migrationFiles)
      {
        console.log(`  ${migrationFile.executed ? chalk.greenBright(migrationFile.name) : chalk.redBright(migrationFile.name)}`);
      }
    }
  }
  
  public static async run(): Promise<void>
  {
    const migrationFilesNotExecutedByGroup = await Container.getProjectMigrations({ includeExecuted: false });
    
    if (Object.keys(migrationFilesNotExecutedByGroup).length === 0)
    {
      console.log(chalk.blueBright('No migrations to run'));
      return;
    }
    
    const config = Container.getConfig();
    const connections = new Connections(config.connections);
    const lastExecutedBatch = await Container.getMigrationDb().getMigrationRepository().getLatestBatch();
    const currentBatch = lastExecutedBatch ? lastExecutedBatch + 1 : 1;
    const mysql = new MySql(connections);
    let migrationsRun: number = 0;
    
    try
    {
      const migrationFilesToRun: Array<MigrationFile> = [];
      
      for (const groupKey in migrationFilesNotExecutedByGroup)
      {
        migrationFilesToRun.push(...migrationFilesNotExecutedByGroup[groupKey]);
      }
      
      // TODO: Test sort function
      migrationFilesToRun.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      
      console.log('migrationFilesToRun', migrationFilesToRun);
      
      for (const migrationFile of migrationFilesToRun)
      {
        const migrationInstance: MigrationInterface = await this.getMigrationClassInstance(migrationFile);
        await migrationInstance.up(mysql);
        
        const migrationRow = new Migration()
        migrationRow.name = migrationFile.name;
        migrationRow.group = migrationFile.group;
        migrationRow.executed = DateTime.now().toSQL({ includeOffset: false });
        migrationRow.batch = currentBatch;
        
        await Container.getMigrationDb().getMigrationRepository().save(migrationRow);
        
        migrationsRun++;
      }
      
      console.log(chalk.green(`Successfully ran ${migrationsRun} migration${migrationsRun !== 1 ? 's' : ''}`));
    }
    catch (e)
    {
      console.log(chalk.redBright(`Failed to run migrations: ${e.message}`));
      console.log(chalk.redBright(e.stack));
      
      // TODO: If rollback on failure flag is set, call rollback method
      
    }
    
    // Close all connections
    await connections.destroyAllInitialised();
  }
  
  public static async rollback(): Promise<void>
  {
    const latestBatch = await Container.getMigrationDb().getMigrationRepository().getLatestBatch();
    
    if (!latestBatch)
    {
      console.log(chalk.blueBright('No migrations to rollback'));
      return;
    }
    
    const config = Container.getConfig();
    const connections = new Connections(config.connections);
    const mysql = new MySql(connections);
    const migrationFilesByGroup = await Container.getProjectMigrations();
    let migrationsRolledBack: number = 0;
    
    const batchMigrations = await Container
      .getMigrationDb()
      .getMigrationRepository()
      .getAllByBatch(latestBatch);
    
    // If there aren't any migrations to run, log a message and exit
    if (Object.keys(batchMigrations).length === 0)
    {
      console.log(chalk.blueBright('No migrations to roll back'));
      return;
    }
    
    try
    {
      // TODO: Test sort function
      const migrationsToRollBack = Object
        .values(batchMigrations)
        .sort((a, b) => {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        })
        .map((migration) => {
          
          const file = migrationFilesByGroup[migration.group].find((projectMigration) => {
            return projectMigration.name === migration.name
          });
          
          if (!file)
          {
            throw new Error(`Could not find migration file for ${migration.name} in group ${migration.group}`);
          }
          
          return {
            migrationRow: migration,
            migrationFile: file
          }
        });
      
      console.log('migrationsToRollBack', migrationsToRollBack);
      
      for (const {migrationRow, migrationFile} of migrationsToRollBack)
      {
        const migrationInstance: MigrationInterface = await this.getMigrationClassInstance(migrationFile);
        await migrationInstance.down(mysql);
        
        await Container.getMigrationDb().getMigrationRepository().remove(migrationRow);
        
        migrationsRolledBack++;
      }
      
      console.log(chalk.green(`Successfully rolled back ${migrationsRolledBack} migration${migrationsRolledBack !== 1 ? 's' : ''}`));
    }
    catch (e)
    {
      console.log(chalk.redBright(`Failed to roll back migrations: ${e.message}`));
      console.log(chalk.redBright(e.stack));
    }
    
    // Close all connections
    await connections.destroyAllInitialised();
  }
  
  private static async getMigrationClassInstance(migration: MigrationFile): Promise<MigrationInterface>
  {
    const importedMigrationModule = await Modules.import(migration.filepath);
    let migrationClass: any;
    
    const migrationClassName = migration.name.split("_").pop();
    
    if (importedMigrationModule[migrationClassName])
    {
      migrationClass = importedMigrationModule[migrationClassName];
    }
    else if (importedMigrationModule.default)
    {
      migrationClass = importedMigrationModule.default;
    }
    else
    {
      throw new Error(`Could not find migration class in ${migration.filepath}`);
    }
    
    return new migrationClass();
  }
}
