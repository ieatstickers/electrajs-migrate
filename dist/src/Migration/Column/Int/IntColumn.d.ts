import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class IntColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    protected readonly type: string;
    nullable(nullable?: boolean): this;
    default(value: number): this;
    unsigned(unsigned?: boolean): this;
    autoIncrement(autoIncrement?: boolean): this;
    zeroFill(zeroFill?: boolean): this;
    primaryKey(primaryKey?: boolean): this;
    index(): this;
    dropIndex(): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
