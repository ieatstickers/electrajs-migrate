import { Table } from "./Table";
import { Connection } from "./Connection";
export declare class Database {
    private readonly connection;
    private readonly operations;
    constructor(connection: Connection, operations: Array<() => Promise<void>>);
    create(tableName: string): Table;
    table(tableName: string): Table;
    drop(tableName: string): this;
    execute(): Promise<void>;
}
