export declare class Commands {
    static status(): Promise<void>;
    static run(): Promise<void>;
    static rollback(): Promise<void>;
    private static getMigrationClassInstance;
}
