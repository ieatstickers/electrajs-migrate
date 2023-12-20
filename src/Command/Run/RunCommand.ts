import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
import { Connections } from "../../Migration/Database/Connections";
import { MySql } from "../../Migration/Database/MySql";
import { MigrationFile } from "../../Type/MigrationFile";
import { MigrationInterface } from "../../Migration/MigrationInterface";
import { Migration } from "../../Dal/Migration/Repository/Migration/Migration";
import { DateTime } from "luxon";
import { RollbackCommand } from "../Rollback/RollbackCommand";
import { Log } from "../../Utility/Log/Log";

export class RunCommand extends AbstractMigrateCommand
{
  private options?: { rollbackOnError?: boolean };
  
  public constructor(options?: { rollbackOnError?: boolean })
  {
    super();
    this.options = options;
  }
  
  public async execute(): Promise<void>
  {
    let migrationsRun: number = 0;
    const config = Container.getConfig();
    const connections = new Connections(config.connections);
    const mysql = new MySql(connections);
    const migrationFilesToRun: Array<MigrationFile> = await this.getMigrationFilesToRun();
    const migrationRepo = Container.getMigrationDb().getMigrationRepository();
    const lastExecutedBatch = await migrationRepo.getLatestBatch();
    const currentBatch = lastExecutedBatch ? lastExecutedBatch + 1 : 1;
    
    try
    {
      for (const migrationFile of migrationFilesToRun)
      {
        Log.yellow(`Running: ${migrationFile.name}`);
        const migrationInstance: MigrationInterface = await this.getMigrationClassInstance(migrationFile);
        await migrationInstance.up(mysql);
        await mysql.executePendingOperations();
        
        const migrationRow = new Migration()
        migrationRow.name = migrationFile.name;
        migrationRow.group = migrationFile.group;
        migrationRow.executed = DateTime.now().toSQL({ includeOffset: false });
        migrationRow.batch = currentBatch;
        
        await migrationRepo.save(migrationRow);
        
        migrationsRun++;
        Log.green(`Success: ${migrationFile.name}`);
        console.log('');
      }
      
      Log.green(`Successfully ran ${migrationsRun} migration${migrationsRun !== 1 ? 's' : ''}`);
    }
    catch (e)
    {
      Log.red(`Failed to run migrations: ${e.message}`);
      Log.red(e.stack);
      
      if (this.options?.rollbackOnError === true)
      {
        if (migrationsRun > 0)
        {
          console.log('');
          Log.yellow("Attempting to roll back migrations...");
          await (new RollbackCommand()).execute();
        }
        else
        {
          console.log('');
          Log.yellow("Nothing to roll back - 0 migrations finished successfully.");
        }
      }
    }
    
    await connections.destroyAllInitialised();
  }
  
  private async getMigrationFilesToRun(): Promise<Array<MigrationFile>>
  {
    const migrationFilesNotExecutedByGroup = await Container.getProjectMigrations({ includeExecuted: false });
    const migrationFilesToRun: Array<MigrationFile> = [];
    
    for (const groupKey in migrationFilesNotExecutedByGroup)
    {
      migrationFilesToRun.push(...migrationFilesNotExecutedByGroup[groupKey]);
    }
    
    migrationFilesToRun.sort((a, b) => a.name < b.name ? -1 : 1)
    
    return migrationFilesToRun;
  }
}
