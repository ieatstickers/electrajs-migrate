import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class TextColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    protected readonly type: string;
    nullable(nullable?: boolean): this;
    after(columnName: string): this;
    getColumnDefinition(): ColumnDefinition;
}
