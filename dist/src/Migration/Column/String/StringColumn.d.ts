import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class StringColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    protected readonly type: string;
    private readonly length;
    constructor(name: string, length?: number);
    nullable(nullable?: boolean): this;
    primaryKey(primaryKey?: boolean): this;
    default(value: string): this;
    dropDefault(): this;
    index(): this;
    dropIndex(): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
