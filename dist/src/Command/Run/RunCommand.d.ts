import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
export declare class RunCommand extends AbstractMigrateCommand {
    private options?;
    constructor(options?: {
        rollbackOnError?: boolean;
    });
    execute(): Promise<void>;
    private getMigrationFilesToRun;
}
