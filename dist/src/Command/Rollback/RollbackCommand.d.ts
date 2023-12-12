import { AbstractMigrateCommand } from "../AbstractMigrateCommand";
export declare class RollbackCommand extends AbstractMigrateCommand {
    execute(): Promise<void>;
    private getMigrationsToRollBack;
}
