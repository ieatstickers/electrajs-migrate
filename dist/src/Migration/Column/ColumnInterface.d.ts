import { ColumnDefinition } from "./ColumnDefinition";
import { IndexDefinition } from "./IndexDefinition";
export interface ColumnInterface {
    getColumnDefinition(): ColumnDefinition;
    getIndexDefinition(): IndexDefinition;
}
