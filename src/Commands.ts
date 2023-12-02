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
  public static async status()
  {
    const migrationDirs = Container.getConfig().migrationDirs;
    const projectMigrations = await Container.getProjectMigrations();
    
    for (const key in projectMigrations)
    {
      const migrations: Array<MigrationFile> = projectMigrations[key];
      const { name: groupDisplayName } = migrationDirs[key];
      
      console.log(chalk.yellowBright(groupDisplayName));
      
      if (migrations.length === 0)
      {
        console.log(chalk.redBright('  * No migrations found *'));
        continue;
      }
      
      for (const migration of migrations)
      {
        // Log migration name in relevant colour
        console.log(`  ${migration.executed ? chalk.green(migration.name) : chalk.redBright(migration.name)}`);
      }
    }
  }
  
  public static async migrate()
  {
    // Get all migrations that haven't been executed
    const projectMigrations = await Container.getProjectMigrations({ includeExecuted: false });
    
    // If there aren't any, log a message and exit
    if (Object.keys(projectMigrations).length === 0)
    {
      console.log(chalk.blueBright('No migrations to run'));
      return;
    }
    
    const config = Container.getConfig();
    const connections = new Connections(config.connections, true);
    
    // Get current batch number
    const latestBatch = await Container.getMigrationDb().getMigrationRepository().getLatestBatch();
    const currentBatch = latestBatch ? latestBatch + 1 : 1;
    
    // Create a MySql instance to be used for all migrations
    const mysql = new MySql(connections);
    const migrationRowsToBeSaved: Array<Migration> = [];
    
    try
    {
      // For each group
      for (const groupKey in projectMigrations)
      {
        const migrations: Array<MigrationFile> = projectMigrations[groupKey];
        
        // For each migration in the current group
        for (const migration of migrations)
        {
          if (migration.executed) continue;
          
          // Run the migration
          const migrationInstance: MigrationInterface = await this.getMigrationClassInstance(migration);
          await migrationInstance.up(mysql);
          
          // Create a migration row to be saved
          const migrationRow = new Migration()
          migrationRow.name = migration.name;
          migrationRow.group = migration.group;
          migrationRow.executed = DateTime.now().toSQL({ includeOffset: false });
          migrationRow.batch = currentBatch;
          
          migrationRowsToBeSaved.push(migrationRow);
        }
      }
      
      const initialisedConnections = connections.getAllInitialised();
      
      // TODO: If no connections initialised, throw error... something wrong with the up method
      // TODO: (either didn't do anything or not waiting for database operations to complete before resolving promise)
      
      // Commit all transactions
      for (const connection of initialisedConnections)
      {
        await connection.commitTransaction();
      }
      
      // Save migration rows
      await Container.getMigrationDb().getMigrationRepository().save(...migrationRowsToBeSaved);
      
      // Log success message
      console.log(chalk.green(`Successfully ran ${migrationRowsToBeSaved.length} migration${migrationRowsToBeSaved.length !== 1 ? 's' : ''}`));
    }
    catch (e)
    {
      // Log error
      console.log(chalk.redBright(`Failed to run migrations: ${e.message}`));
      
      const initialisedConnections = connections.getAllInitialised();
      
      // If any migrations failed, roll back all transactions
      for (const connection of initialisedConnections)
      {
        await connection.rollbackTransaction();
      }
    }
    
    const initialisedConnections = connections.getAllInitialised();
    
    // Close all connections
    for (const connection of initialisedConnections)
    {
      await connection.destroy();
    }
  }
  
  public static async rollback()
  {
    const latestBatch = await Container.getMigrationDb().getMigrationRepository().getLatestBatch();
    
    if (!latestBatch)
    {
      console.log(chalk.blueBright('No migrations to rollback'));
      return;
    }
    
    // Create a data source and a query runner for each database connection and start a transaction for each
    const config = Container.getConfig();
    const connections = new Connections(config.connections, true);
    
    // Create a MySql instance to be used for all migrations
    const mysql = new MySql(connections);
    const migrationRowsToBeDeleted: Array<Migration> = [];
    
    const projectMigrations = await Container.getProjectMigrations();
    // Get all migrations in the last batch
    const batchMigrations = await Container.getMigrationDb().getMigrationRepository().getAllByBatch(latestBatch);
    
    // If there aren't any migrations to run, log a message and exit
    if (Object.keys(batchMigrations).length === 0)
    {
      console.log(chalk.blueBright('No migrations to roll back'));
      return;
    }
    
    try
    {
      // For each migration in the last batch
      for (const migration of Object.values(batchMigrations))
      {
        const projectMigration = projectMigrations[migration.group].find((projectMigration) => {
          return projectMigration.name === migration.name
        });
        
        // Get migration class
        const migrationInstance: MigrationInterface = await this.getMigrationClassInstance(projectMigration);
        // Run the migration's down method
        await migrationInstance.down(mysql);
        
        // Add id of migration to be deleted to array
        migrationRowsToBeDeleted.push(migration);
      }
      
      const initialisedConnections = connections.getAllInitialised();
      
      // TODO: If no connections initialised, throw error... something wrong with the down method
      // TODO: (either didn't do anything or not waiting for database operations to complete before resolving promise)
      
      // Commit all transactions
      for (const connection of initialisedConnections)
      {
        await connection.commitTransaction();
      }
      
      // Delete all migrations in the last batch
      await Container.getMigrationDb().getMigrationRepository().remove(...migrationRowsToBeDeleted);
      
      // Log success message
      console.log(chalk.green(`Successfully rolled back ${migrationRowsToBeDeleted.length} migration${migrationRowsToBeDeleted.length !== 1 ? 's' : ''}`));
    }
    catch (e)
    {
      // Log error
      console.log(chalk.redBright(`Failed to run migrations: ${e.message}`));
      
      const initialisedConnections = connections.getAllInitialised();
      
      // If any migrations failed, roll back all transactions
      for (const connection of initialisedConnections)
      {
        await connection.rollbackTransaction();
      }
    }
    
    const initialisedConnections = connections.getAllInitialised();
    
    // Close all connections
    for (const connection of initialisedConnections)
    {
      await connection.destroy();
    }
  }
  
  private static async getMigrationClassInstance(migration: MigrationFile): Promise<MigrationInterface>
  {
    const importedMigrationModule = await Modules.import(migration.filepath);
    let migrationClass: any;
    
    if (
      typeof importedMigrationModule === 'function'
      && importedMigrationModule.prototype
      && importedMigrationModule.prototype.constructor
    )
    {
      migrationClass = importedMigrationModule;
    }
    else
    {
      const migrationClassName = migration.name.split('_').pop();
      
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
    }
    
    return new migrationClass();
  }
}
