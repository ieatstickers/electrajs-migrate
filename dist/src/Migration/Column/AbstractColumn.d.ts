import { Schema } from "@electra/utility";
import { ColumnInterface } from "./ColumnInterface";
import { ColumnDefinition } from "../Definition/ColumnDefinition";
import { IndexDefinition } from "../Definition/IndexDefinition";
import { ValidatorResult } from "@electra/utility/dist/src/Validators/Type/ValidatorResult";
export declare abstract class AbstractColumn implements ColumnInterface {
    protected name: string;
    constructor(name: string);
    abstract getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
    getName(): string;
    protected validateColumnName(name: string): ValidatorResult;
    protected validateOptions(options: {
        [key: string]: any;
    }, schema: Schema): boolean;
    protected addNullableStatement(query: string, nullable: boolean): string;
    protected addDefaultStatement(query: string, defaultValue: any): string;
    protected addIndexStatement(query: string, index: boolean, columnName: string): string;
    protected addUnsignedStatement(query: string, unsigned: boolean): string;
    protected addZeroFillStatement(query: string, zeroFill: boolean): string;
    protected addAutoIncrementStatement(query: string, autoIncrement: boolean): string;
    protected addPrimaryKeyStatement(query: string, primaryKey: boolean): string;
    protected addAfterStatement(query: string, addAfter: string, tableExists: boolean): string;
}
