export declare class Commands {
    static status(): Promise<void>;
    static run(options?: {
        rollbackOnError?: boolean;
    }): Promise<void>;
    static rollback(): Promise<void>;
    private static getMigrationClassInstance;
}
