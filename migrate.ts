import { Container } from "./src/DI/Container";
import chalk from "chalk";
import "reflect-metadata";
import { StatusCommand } from "./src/Command/Status/StatusCommand";
import { RunCommand } from "./src/Command/Run/RunCommand";
import { RollbackCommand } from "./src/Command/Rollback/RollbackCommand";
import { NewCommand } from "./src/Command/New/NewCommand";

// Override file name to "migrate" regardless of whether we're running migrate-js or migrate-ts
process.argv[1] = "migrate";

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
  
  try
  {
    await Container.loadConfig();
    const { default: application } = await import('caporal');
    
    application
      .name("Electra Migrate")
      .description("MySQL Migrations for Node.js Applications")
      .version(require('./package.json').version);
    
    // new
    application
      .command('new', 'Create a new migration')
      .argument('<name>', 'The name of the migration')
      .argument('[group]', 'The group to add the migration to')
      .option('--ts', 'Create a TypeScript migration file')
      .option('--js', 'Create a JavaScript migration file')
      .action(
        dbAction(async (args, options) => {
          
          if (options.ts && options.js)
          {
            throw new Error('Cannot specify both --ts and --js');
          }
          
          const type = options.ts ? 'ts' : options.js ? 'js' : undefined;
          
          await (new NewCommand(args['name'], args['group'], type)).execute()
        })
      );
    
    // status
    application
      .command('status', 'Show the status of all migrations')
      .action(
        dbAction(async () => {
          await (new StatusCommand()).execute()
        })
      );
    
    // migrate
    application
      .command('run', 'Run all migrations')
      .option('--rollback-on-error', 'Automatically rollback migrations if an error occurs')
      .action(
        dbAction(async (args, options) => {
          const command = new RunCommand({
            rollbackOnError: options.rollbackOnError || false
          });
          
          await command.execute();
        })
      );
    
    // rollback
    application
      .command('rollback', 'Rollback the last batch of migrations')
      .action(
        dbAction(async () => {
          await (new RollbackCommand()).execute();
        })
      );
    
    application.parse(process.argv);
  }
  catch (e)
  {
    console.log(chalk.redBright(e.stack));
  }
  
})();
