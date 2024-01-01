import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
export declare class NewCommand extends AbstractMigrateCommand {
    private readonly migrationName;
    private readonly migrationDir;
    constructor(migrationName: string, migrationDir?: string);
    execute(): Promise<void>;
    private getFileTemplate;
    private getMigrationFileName;
    private getTsMigrationTemplate;
    private getMjsMigrationTemplate;
    private getCjsMigrationTemplate;
}
