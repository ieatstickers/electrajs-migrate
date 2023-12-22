import { ColumnInterface } from "../ColumnInterface";
import { BlobColumn } from "./BlobColumn";
export declare class LongBlobColumn extends BlobColumn implements ColumnInterface {
    protected readonly type: string;
}
