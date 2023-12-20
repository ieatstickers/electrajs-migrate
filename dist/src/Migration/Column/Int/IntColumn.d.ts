import { IntColumnOptions } from "./IntColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class IntColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<IntColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
