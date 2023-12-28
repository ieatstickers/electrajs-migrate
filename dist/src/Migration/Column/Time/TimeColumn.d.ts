import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class TimeColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    nullable(nullable?: boolean): this;
    default(value: string): this;
    dropDefault(): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
}
