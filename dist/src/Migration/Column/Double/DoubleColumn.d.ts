import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class DoubleColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    private readonly precision;
    private readonly scale;
    constructor(name: string, precision?: number, scale?: number);
    nullable(nullable?: boolean): this;
    default(value: number): this;
    dropDefault(): this;
    zeroFill(zeroFill?: boolean): this;
    index(): this;
    dropIndex(): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
