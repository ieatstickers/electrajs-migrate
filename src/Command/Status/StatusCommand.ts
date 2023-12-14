import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
import { MigrationFile } from "../../Type/MigrationFile";
import { Log } from "../../Utility/Log/Log";

export class StatusCommand extends AbstractMigrateCommand
{
  public async execute(): Promise<void>
  {
    const migrationDirs = Container.getConfig().migrationDirs;
    const migrationFilesByGroup = await Container.getProjectMigrations();
    
    for (const groupKey in migrationFilesByGroup)
    {
      const migrationFiles: Array<MigrationFile> = migrationFilesByGroup[groupKey];
      const { name: groupDisplayName } = migrationDirs[groupKey];
      
      Log.yellow(groupDisplayName);
      
      if (migrationFiles.length === 0)
      {
        Log.red('  * No migrations found *');
        continue;
      }
      
      for (const migrationFile of migrationFiles)
      {
        migrationFile.executed
          ? Log.green(`  ${migrationFile.name}`)
          : Log.red(`  ${migrationFile.name}`);
      }
    }
  }
}
