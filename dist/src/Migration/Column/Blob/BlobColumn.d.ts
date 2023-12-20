import { BlobColumnOptions } from "./BlobColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
export declare class BlobColumn extends AbstractColumn implements ColumnInterface {
    private readonly options;
    constructor(name: string, options?: Partial<BlobColumnOptions>);
    getColumnDefinition(): ColumnDefinition;
}
