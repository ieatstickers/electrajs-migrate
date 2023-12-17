import { StringColumnOptions } from "./StringColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";
export declare class StringColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly options;
    constructor(name: string, options?: Partial<StringColumnOptions>);
    getDefinition(): Promise<string>;
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
