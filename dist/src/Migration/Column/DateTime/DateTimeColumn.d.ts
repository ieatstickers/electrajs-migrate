import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class DateTimeColumn extends AbstractColumn implements ColumnInterface {
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
