import { ColumnDefinition } from "../Definition/ColumnDefinition";
import { IndexDefinition } from "../Definition/IndexDefinition";

export interface ColumnInterface
{
  getName(): string;
  getColumnDefinition(): ColumnDefinition;
  getIndexDefinition(): IndexDefinition;
}
