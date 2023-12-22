import { ColumnInterface } from "../ColumnInterface";
import { TextColumn } from "./TextColumn";
export declare class TinyTextColumn extends TextColumn implements ColumnInterface {
    protected readonly type: string;
}
