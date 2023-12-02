import { MigrateConfig } from "../Type/MigrateConfig";
import { MigrationDb } from "../Database/Migration/MigrationDb";
import { MigrationFile } from "../Type/MigrationFile";
export declare class Container {
    private static config;
    private static migrationDb;
    static ensureMigrationDbExists(): Promise<void>;
    static getMigrationDb(): MigrationDb;
    static loadConfig(): Promise<MigrateConfig>;
    static getConfig(): MigrateConfig;
    static getProjectMigrations(options?: {
        includeExecuted?: boolean;
    }): Promise<{
        [key: string]: Array<MigrationFile>;
    }>;
    private static getMigrationDbConnectionOptions;
}
