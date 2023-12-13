import { MigrateCommandInterface } from "./MigrateCommandInterface";
import { MigrationFile } from "../Type/MigrationFile";
import { MigrationInterface } from "../Migration/MigrationInterface";
import { Modules } from "../Utility/Modules";
const path = require('path');

export abstract class AbstractMigrateCommand implements MigrateCommandInterface
{
  public abstract execute(): void | Promise<void>;
  
  protected async getMigrationClassInstance(migration: MigrationFile): Promise<MigrationInterface>
  {
    console.log(
      `requiring: ${migration.filepath}`,
      `from: ${__dirname}`,
      `as: ${path.relative(__dirname, migration.filepath)}`,
      )
    return require(`${path.relative(__dirname, migration.filepath)}`);
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
