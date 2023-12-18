import { DecimalColumnOptions } from "./DecimalColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";
export declare class DecimalColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<DecimalColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
