import { BlobColumnOptions } from "./BlobColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";
export declare class BlobColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly options;
    constructor(name: string, options?: Partial<BlobColumnOptions>);
    getDefinition(): Promise<string>;
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
