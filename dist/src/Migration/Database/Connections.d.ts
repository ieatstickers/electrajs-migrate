import { Connection } from "./Connection";
type ConnectionConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
    databases: Array<string>;
};
export declare class Connections {
    private readonly config;
    private readonly connections;
    private readonly startTransactionOnInit;
    constructor(config: {
        [name: string]: ConnectionConfig;
    }, startTransactionOnInit?: boolean);
    get(connectionName: string): Connection;
    getAllByDatabaseName(databaseName: string): Array<Connection>;
    getAllInitialised(): Array<Connection>;
}
export {};
