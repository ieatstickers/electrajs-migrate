import { StringColumnOptions } from "./StringColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";
export declare class StringColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<StringColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
