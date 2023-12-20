import { TimeColumnOptions } from "./TimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class TimeColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<TimeColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
}
