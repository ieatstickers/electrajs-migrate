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
    constructor(connection: ConnectionConfig);
    query(query: string, parameters?: Array<any>): Promise<any>;
    destroy(): Promise<void>;
    isInitialised(): boolean;
    private get;
}
export {};
