import { Table } from "./Table";
import { Connection } from "./Connection";
import { CreateTableOptions } from "./Type/CreateTableOptions";

export class Database
{
  private readonly connection: Connection;
  private readonly operations: Array<() => Promise<void>>;
  
  public constructor(connection: Connection, operations: Array<() => Promise<void>>)
  {
    this.connection = connection;
    this.operations = operations;
  }
  
  public create(tableName: string, options?: CreateTableOptions): Table
  {
    return new Table(tableName, this.connection, this.operations, false, options);
  }
  
  public table(tableName: string): Table
  {
    return new Table(tableName, this.connection, this.operations, true);
  }
}
