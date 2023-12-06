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
    escape(name: string): Promise<string>;
    private get;
}
export {};
