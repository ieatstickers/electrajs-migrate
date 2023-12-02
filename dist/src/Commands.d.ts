export declare class Commands {
    static status(): Promise<void>;
    static migrate(): Promise<void>;
    static rollback(): Promise<void>;
    private static getMigrationClassInstance;
}
