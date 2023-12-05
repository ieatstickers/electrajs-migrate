import { Table } from "./Table";
import { Connection } from "./Connection";

export class Database
{
  private readonly connection: Connection;
  private readonly operations: Array<() => Promise<void>>;
  
  public constructor(connection: Connection, operations: Array<() => Promise<void>>)
  {
    this.connection = connection;
    this.operations = operations;
  }
  
  public create(tableName: string): Table
  {
    console.log('create', tableName);
    return new Table(tableName, this.connection, this.operations, false);
  }
  
  public table(tableName: string): Table
  {
    console.log('table', tableName);
    return new Table(tableName, this.connection, this.operations, true);
  }
  
  public drop(tableName: string): this
  {
    this.operations.push(async () => {
      await this.connection.query(`DROP TABLE ${tableName};`);
    });
    
    return this;
  }
  
  public async execute(): Promise<void>
  {
    for (const operation of this.operations)
    {
      await operation();
    }
  }
}
