import { Connection } from "../Database/Connection";

export interface ColumnInterface
{
  create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
}
