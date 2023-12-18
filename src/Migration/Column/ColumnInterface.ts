import { ColumnDefinition } from "./ColumnDefinition";
import { IndexDefinition } from "./IndexDefinition";

export interface ColumnInterface
{
  getName(): string;
  getColumnDefinition(): ColumnDefinition;
  getIndexDefinition(): IndexDefinition;
}
