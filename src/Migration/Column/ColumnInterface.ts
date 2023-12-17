import { Connection } from "../Database/Connection";

export interface ColumnInterface
{
  getDefinition(): Promise<string>;
  create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
