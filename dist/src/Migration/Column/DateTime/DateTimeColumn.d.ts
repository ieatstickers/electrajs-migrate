import { DateTimeColumnOptions } from "./DateTimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";
export declare class DateTimeColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<DateTimeColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
