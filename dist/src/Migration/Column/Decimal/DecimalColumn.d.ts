import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class DecimalColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    private readonly precision;
    private readonly scale;
    constructor(name: string, precision?: number, scale?: number);
    nullable(nullable?: boolean): DecimalColumn;
    default(value: number): DecimalColumn;
    unsigned(unsigned?: boolean): DecimalColumn;
    zeroFill(zeroFill?: boolean): DecimalColumn;
    index(): DecimalColumn;
    dropIndex(): DecimalColumn;
    after(columnName: string): DecimalColumn;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
