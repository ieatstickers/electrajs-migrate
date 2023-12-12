export interface MigrateCommandInterface {
    execute(): void | Promise<void>;
}
