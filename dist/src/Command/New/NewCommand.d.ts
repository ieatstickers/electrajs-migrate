import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
export declare class NewCommand extends AbstractMigrateCommand {
    private readonly migrationName;
    private readonly migrationDir;
    private readonly type;
    constructor(migrationName: string, migrationDir?: string, type?: 'ts' | 'js');
    execute(): Promise<void>;
    private getFileTemplate;
    private getMigrationFileName;
    private getTsMigrationTemplate;
    private getMjsMigrationTemplate;
    private getCjsMigrationTemplate;
}
