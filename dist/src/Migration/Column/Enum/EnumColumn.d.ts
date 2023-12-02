import { EnumColumnOptions } from "./EnumColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Connection } from "../../Database/Connection";
import { AbstractColumn } from "../AbstractColumn";
export declare class EnumColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly values;
    private readonly options;
    constructor(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>);
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
