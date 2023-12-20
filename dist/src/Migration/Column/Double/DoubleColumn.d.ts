import { DoubleColumnOptions } from "./DoubleColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class DoubleColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<DoubleColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
