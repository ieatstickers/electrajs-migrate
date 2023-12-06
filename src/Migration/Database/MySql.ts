import { Database } from "./Database";
import { Connections } from "./Connections";
import { Connection } from "./Connection";

export class MySql
{
  private readonly connections: Connections;
  private readonly operations: Array<() => Promise<void>> = [];
  
  public constructor(connections: Connections)
  {
    this.connections = connections;
  }
  
  public database(name: string, connectionName?: string): Database
  {
    let connection: Connection;
    
    if (!connectionName)
    {
      const connections = this.connections.getAllByDatabaseName(name);
      
      if (connections.length === 0) throw new Error(`No connections found for database "${name}"`);
      if (connections.length > 1) throw new Error(`Multiple connections found for database "${name}". Connection name must be specified.`);
      connection = connections[0];
    }
    else
    {
      connection = this.connections.get(connectionName);
    }
    
    this.operations.push(async () => {
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${await connection.escape(name)};`);
    });

    this.operations.push(async () => {
      await connection.query(`USE ${await connection.escape(name)};`);
    });
    
    return new Database(connection, this.operations);
  }
  
  public async executePendingOperations(): Promise<void>
  {
    while(this.operations.length > 0)
    {
      const operation = this.operations.shift();
      await operation();
    }
  }
}
