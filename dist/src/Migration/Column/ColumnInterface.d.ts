import { ColumnDefinition } from "../Definition/ColumnDefinition";
import { IndexDefinition } from "../Definition/IndexDefinition";
export interface ColumnInterface {
    getName(): string;
    exists(): boolean;
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
