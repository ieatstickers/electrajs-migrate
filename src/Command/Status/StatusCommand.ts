import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
import { Container } from "../../DI/Container";
import { MigrationFile } from "../../Type/MigrationFile";
import chalk from "chalk";

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
}
