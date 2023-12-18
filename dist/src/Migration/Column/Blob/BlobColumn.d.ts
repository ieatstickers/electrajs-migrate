import { BlobColumnOptions } from "./BlobColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";
import { ColumnDefinition } from "../ColumnDefinition";
export declare class BlobColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly options;
    constructor(name: string, options?: Partial<BlobColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
