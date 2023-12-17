import { DateTimeColumnOptions } from "./DateTimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";
export declare class DateTimeColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly options;
    constructor(name: string, options?: Partial<DateTimeColumnOptions>);
    getDefinition(): Promise<string>;
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
