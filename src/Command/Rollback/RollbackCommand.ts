import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
import chalk from "chalk";
import { Connections } from "../../Migration/Database/Connections";
import { MySql } from "../../Migration/Database/MySql";
import { MigrationInterface } from "../../Migration/MigrationInterface";
import { Migration } from "../../Database/Migration/Repository/Migration/Migration";
import { MigrationFile } from "../../Type/MigrationFile";

export class RollbackCommand extends AbstractMigrateCommand
{
  public async execute(): Promise<void>
  {
    const config = Container.getConfig();
    const connections = new Connections(config.connections);
    const mysql = new MySql(connections);
    let migrationsRolledBack: number = 0;
    const migrationsToRollBack = await this.getMigrationsToRollBack();
    
    if (!migrationsToRollBack.length)
    {
      console.log(chalk.blueBright('No migrations to rollback'));
      return;
    }
    
    try
    {
      for (const {migrationRow, migrationFile} of migrationsToRollBack)
      {
        const migrationInstance: MigrationInterface = await this.getMigrationClassInstance(migrationFile);
        await migrationInstance.down(mysql);
        await mysql.executePendingOperations();
        
        await Container.getMigrationDb().getMigrationRepository().remove(migrationRow);
        
        migrationsRolledBack++;
      }
      
      console.log(chalk.greenBright(`Successfully rolled back ${migrationsRolledBack} migration${migrationsRolledBack !== 1 ? 's' : ''}`));
    }
    catch (e)
    {
      console.log(chalk.redBright(`Failed to roll back migrations: ${e.message}`));
      console.log(chalk.redBright(e.stack));
    }
    
    // Close all connections
    await connections.destroyAllInitialised();
  }
  
  private async getMigrationsToRollBack(): Promise<Array<{ migrationRow: Migration, migrationFile: MigrationFile }>>
  {
    const latestBatch = await Container.getMigrationDb().getMigrationRepository().getLatestBatch();
    if (!latestBatch) return [];
    
    const batchMigrations = await Container
      .getMigrationDb()
      .getMigrationRepository()
      .getAllByBatch(latestBatch);
    
    const migrationFilesByGroup = await Container.getProjectMigrations();
    
    return Object
      .values(batchMigrations)
      .sort((a, b) => a.name < b.name ? 1 : -1)
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
  }
}
