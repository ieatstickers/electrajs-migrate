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
    constructor(config: {
        [name: string]: ConnectionConfig;
    });
    get(connectionName: string): Connection;
    getAllByDatabaseName(databaseName: string): Array<Connection>;
    destroyAllInitialised(): Promise<void>;
    private getAllInitialised;
}
export {};
