import { ColumnInterface } from "../ColumnInterface";
import { TextColumn } from "./TextColumn";
export declare class LongTextColumn extends TextColumn implements ColumnInterface {
    protected readonly type: string;
}
