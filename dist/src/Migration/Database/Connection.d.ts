type ConnectionConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
};
export declare class Connection {
    private readonly connectionConfig;
    private connection;
    private queryRunner;
    private readonly startTransactionOnInit;
    constructor(connection: ConnectionConfig, startTransactionOnInit?: boolean);
    query(query: string, parameters?: Array<any>): Promise<any>;
    destroy(): Promise<void>;
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    isInitialised(): boolean;
    private get;
}
export {};
