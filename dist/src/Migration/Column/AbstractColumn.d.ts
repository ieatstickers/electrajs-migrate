import { Schema } from "@electra/utility";
import { ColumnInterface } from "./ColumnInterface";
import { Connection } from "../Database/Connection";
export declare abstract class AbstractColumn implements ColumnInterface {
    abstract create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
    protected validateName(name: string): boolean;
    protected validateOptions(options: {
        [key: string]: any;
    }, schema: Schema): boolean;
}
