import { EnumColumnOptions } from "./EnumColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class EnumColumn extends AbstractColumn implements ColumnInterface {
    private readonly values;
    private readonly options;
    constructor(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
