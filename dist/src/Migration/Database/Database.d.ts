import { Table } from "./Table";
import { Connection } from "./Connection";
import { CreateTableOptions } from "./Type/CreateTableOptions";
export declare class Database {
    private readonly connection;
    private readonly operations;
    constructor(connection: Connection, operations: Array<() => Promise<void>>);
    create(tableName: string, options?: CreateTableOptions): Table;
    table(tableName: string): Table;
}
