import { DecimalColumnOptions } from "./DecimalColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";
export declare class DecimalColumn extends AbstractColumn implements ColumnInterface {
    private readonly name;
    private readonly options;
    constructor(name: string, options?: Partial<DecimalColumnOptions>);
    getDefinition(): Promise<string>;
    create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
