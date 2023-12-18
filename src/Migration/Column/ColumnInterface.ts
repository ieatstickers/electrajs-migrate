import { Connection } from "../Database/Connection";
import { ColumnDefinition } from "./ColumnDefinition";
import { IndexDefinition } from "./IndexDefinition";

export interface ColumnInterface
{
  getColumnDefinition(): ColumnDefinition;
  getIndexDefinition(): IndexDefinition;
  create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
