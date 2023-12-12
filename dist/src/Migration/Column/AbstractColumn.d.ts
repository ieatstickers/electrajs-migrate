import { Schema } from "@electra/utility";
import { ColumnInterface } from "./ColumnInterface";
import { Connection } from "../Database/Connection";
export declare abstract class AbstractColumn implements ColumnInterface {
    abstract create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
    protected validateName(name: string): boolean;
    protected validateOptions(options: {
        [key: string]: any;
    }, schema: Schema): boolean;
    protected addNullableStatement(query: string, nullable: boolean): string;
    protected addDefaultStatement(query: string, defaultValue: any): string;
    protected addIndexStatement(query: string, index: boolean): string;
    protected addUnsignedStatement(query: string, unsigned: boolean): string;
    protected addZeroFillStatement(query: string, zeroFill: boolean): string;
    protected addAutoIncrementStatement(query: string, autoIncrement: boolean): string;
    protected addPrimaryKeyStatement(query: string, primaryKey: boolean): string;
    protected addAfterStatement(query: string, addAfter: string, tableExists: boolean): string;
}
