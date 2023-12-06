import { Container } from "./src/DI/Container";
import { Commands } from "./src/Commands";
import chalk from "chalk";
import "reflect-metadata";

function dbAction(
  action: (
    args: { [k: string]: any },
    options: { [k: string]: any },
    logger: Logger
  ) => Promise<void>
): ActionCallback
{
  return async (args, options, logger) => {
    // Initialise MigrationDb
    await Container.ensureMigrationDbExists();
    await Container.getMigrationDb().initialize();
    
    // Run action
    await action(args, options, logger);
    
    // Destroy MigrationDb
    await Container.getMigrationDb().destroy();
  };
}

(async () => {
  
  await Container.loadConfig();
  
  const { default: application } = await import('caporal');
  
  try
  {
    application
      .name("Electra Migrate")
      .description("MySQL Migrations for Node.js Applications")
      .version(require('./package.json').version);
    
    // status
    application
      .command('status', 'Show the status of all migrations')
      .action(
        dbAction(async () => {
          await Commands.status();
        })
      );
    
    // migrate
    application
      .command('run', 'Run all migrations')
      .option('--rollback-on-error', 'Automatically rollback migrations if an error occurs')
      .action(
        dbAction(async (args, options, logger) => {
          await Commands.run({
            rollbackOnError: options.rollbackOnError || false
          });
        })
      );
    
    // rollback
    application
      .command('rollback', 'Rollback the last batch of migrations')
      .action(
        dbAction(async () => {
          await Commands.rollback();
        })
      );
    
    application.parse(process.argv);
  }
  catch (e)
  {
    console.log(chalk.redBright(e.stack));
  }
  
})();
