import { MySqlConnectionOptions } from "./MySqlConnectionOptions";

export type MigrateConfig = {
  migrationDatabase: string,
  migrationDirs: { [key: string]: { name: string, path: string } }
  connections: {
    [name: string]: MySqlConnectionOptions
  }
};
