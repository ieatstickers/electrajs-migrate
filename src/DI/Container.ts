import { MigrateConfig } from "../Type/MigrateConfig";
import { Validators } from "@electra/utility";
import { MigrationDb } from "../Database/Migration/MigrationDb";
import { MigrationFile } from "../Type/MigrationFile";
import { MySqlConnectionOptions } from "../Type/MySqlConnectionOptions";
import { DataSource } from "typeorm";
import path from 'path';
import fs from "fs";
import { Modules } from "../Utility/Modules";

export class Container
{
  private static config: MigrateConfig;
  private static migrationDb: MigrationDb;
  
  public static async ensureMigrationDbExists(): Promise<void>
  {
    const options = this.getMigrationDbConnectionOptions();
    
    const dataSource = new DataSource({
      type: "mysql",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
    });
    
    await dataSource.initialize();
    
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query(`CREATE DATABASE IF NOT EXISTS ${options.database};`);
    await queryRunner.query(`USE ${options.database}`);
    await queryRunner.query(
      `
      CREATE TABLE IF NOT EXISTS migration (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`group\` VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        executed DATETIME NOT NULL,
        batch INT NOT NULL,
        created DATETIME NOT NULL,
        updated DATETIME NOT NULL
      ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
      `
    );
    await queryRunner.release();
    await dataSource.destroy();
  }
  
  public static getMigrationDb(): MigrationDb
  {
    if (!this.migrationDb)
    {
      this.migrationDb = new MigrationDb(this.getMigrationDbConnectionOptions());
    }
    
    return this.migrationDb;
  }
  
  public static async loadConfig(): Promise<MigrateConfig>
  {
    try
    {
      this.config = await Modules.import("default", path.join(process.cwd(), "migrate.config.js"));
    }
    catch (error)
    {
      throw new Error(`Failed to read migrate.config.js file: ${error.message}`);
    }
    
    const { valid, message } = Validators
      .schema({
        migrationDatabase: Validators.string(),
        connections: Validators.object(
          Validators.schema({
            host: Validators.string(),
            port: Validators.integer(),
            username: Validators.string(),
            password: Validators.string(),
            databases: Validators.array(Validators.string()),
          })
        ),
        migrationDirs: Validators.object(
          Validators.schema({
            name: Validators.string(),
            path: Validators.string()
          })
        )
      })
      .validate(this.config);
    
    if (!valid) throw new Error(`Invalid migrate.config.js file: ${message}`);
    
    return this.config;
  }
  
  public static getConfig(): MigrateConfig
  {
    if (!this.config)
    {
      throw new Error("Config not loaded");
    }
    
    return this.config;
  }
  
  public static async getProjectMigrations(options?: { includeExecuted?: boolean }): Promise<{ [key: string]: Array<MigrationFile> }>
  {
    const projectMigrations = {};
    const migrationDirs = this.getConfig().migrationDirs;
    const existingDbMigrations = await this.getMigrationDb().getMigrationRepository().getAll();
    
    // For each migration directory
    for (const groupKey in migrationDirs)
    {
      projectMigrations[groupKey] = [];
      const { name: groupDisplayName, path: groupMigrationDirPath } = migrationDirs[groupKey];
      let files: Array<string>;
      
      const dirPath = path.join(process.cwd(), groupMigrationDirPath);
      
      // Read all files from dir
      try
      {
        files = await fs.promises.readdir(dirPath);
      }
      catch (e)
      {
        throw new Error(`Failed to read migration directory ${groupMigrationDirPath}: ${e.message}`);
      }
      
      // For each file found
      for (const file of files)
      {
        const [ fileName ] = file.split(".");
        
        const dbRow = Object.values(existingDbMigrations).find((dbRow) => dbRow.name === fileName);
        
        if (options?.includeExecuted === false && dbRow?.executed) continue;
        
        const projectMigration = {
          filepath: `${dirPath}/${file}`,
          group: groupKey,
          groupDisplayName: groupDisplayName,
          name: fileName,
          executed: dbRow?.executed || null,
          batch: dbRow?.batch || null
        };
        
        projectMigrations[groupKey].push(projectMigration);
      }
    }
    
    return projectMigrations;
  }
  
  private static getMigrationDbConnectionOptions(): { database: string, host: string, port: number, username: string, password: string }
  {
    const config = this.getConfig();
    const { migrationDatabase } = config;
    
    let connectionOptions: MySqlConnectionOptions;
    
    for (const connectionName in config.connections)
    {
      if (config.connections[connectionName].databases.includes(migrationDatabase))
      {
        if (connectionOptions) throw new Error(`Multiple connections found for migration database "${migrationDatabase}"`);
        connectionOptions = config.connections[connectionName];
      }
    }
    
    if (!connectionOptions)
    {
      throw new Error(`Cannot connect to migration database - no connection found for database "${migrationDatabase}"`);
    }
    
    return {
      database: migrationDatabase,
      host: connectionOptions.host,
      port: connectionOptions.port,
      username: connectionOptions.username,
      password: connectionOptions.password
    };
  }
}
