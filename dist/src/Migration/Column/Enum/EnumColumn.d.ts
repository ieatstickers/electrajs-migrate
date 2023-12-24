import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class EnumColumn extends AbstractColumn implements ColumnInterface {
    private readonly values;
    private readonly options;
    constructor(name: string, values: Array<string>);
    nullable(nullable?: boolean): this;
    default(value: string): this;
    index(): this;
    dropIndex(): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
