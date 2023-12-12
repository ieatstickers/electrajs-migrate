import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
import { Connections } from "../../Migration/Database/Connections";
import { MySql } from "../../Migration/Database/MySql";
import { MigrationFile } from "../../Type/MigrationFile";
import { MigrationInterface } from "../../Migration/MigrationInterface";
import { Migration } from "../../Database/Migration/Repository/Migration/Migration";
import { DateTime } from "luxon";
import chalk from "chalk";
import { RollbackCommand } from "../Rollback/RollbackCommand";

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
      }
      
      console.log(chalk.greenBright(`Successfully ran ${migrationsRun} migration${migrationsRun !== 1 ? 's' : ''}`));
    }
    catch (e)
    {
      console.log(chalk.redBright(`Failed to run migrations: ${e.message}`));
      console.log(chalk.redBright(e.stack));
      
      if (this.options?.rollbackOnError === true)
      {
        if (migrationsRun > 0)
        {
          console.log('');
          console.log(chalk.yellowBright("Attempting to roll back migrations..."));
          await (new RollbackCommand()).execute();
        }
        else
        {
          console.log('');
          console.log(chalk.yellowBright("Nothing to roll back - 0 migrations finished successfully."));
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
