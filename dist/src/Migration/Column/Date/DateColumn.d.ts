import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class DateColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    nullable(nullable?: boolean): this;
    default(value: string): this;
    dropDefault(): this;
    index(): this;
    dropIndex(): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
