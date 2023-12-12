import { MigrateCommandInterface } from "./MigrateCommandInterface";
import { MigrationFile } from "../Type/MigrationFile";
import { MigrationInterface } from "../Migration/MigrationInterface";
export declare abstract class AbstractMigrateCommand implements MigrateCommandInterface {
    abstract execute(): void | Promise<void>;
    protected getMigrationClassInstance(migration: MigrationFile): Promise<MigrationInterface>;
}
