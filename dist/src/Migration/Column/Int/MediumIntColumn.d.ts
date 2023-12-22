import { ColumnInterface } from "../ColumnInterface";
import { IntColumn } from "./IntColumn";
export declare class MediumIntColumn extends IntColumn implements ColumnInterface {
    protected readonly type: string;
}
