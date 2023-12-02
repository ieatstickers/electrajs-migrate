import { Database } from "./Database";
import { Connections } from "./Connections";
export declare class MySql {
    private readonly connections;
    private readonly operations;
    constructor(connections: Connections);
    database(name: string, connectionName?: string): Database;
}
