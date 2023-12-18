import { DateColumnOptions } from "./DateColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";
export declare class DateColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly options;
    constructor(name: string, options?: Partial<DateColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
