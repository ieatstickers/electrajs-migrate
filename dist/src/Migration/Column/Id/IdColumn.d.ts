import { ColumnInterface } from "../ColumnInterface";
import { IntColumn } from "../Int/IntColumn";
export declare class IdColumn extends IntColumn implements ColumnInterface {
    constructor(name: string);
}
