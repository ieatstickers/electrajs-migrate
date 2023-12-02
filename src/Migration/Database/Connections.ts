
import { Connection } from "./Connection";

type ConnectionConfig = {
  host: string,
  port: number,
  username: string,
  password: string,
  databases: Array<string>
};

export class Connections
{
  private readonly config: { [name: string]: ConnectionConfig } = {};
  private readonly connections: { [name: string]: Connection } = {};
  private readonly startTransactionOnInit: boolean = false;
  
  public constructor(config: { [name: string]: ConnectionConfig }, startTransactionOnInit: boolean = false)
  {
    this.config = config;
    this.startTransactionOnInit = startTransactionOnInit;
  }
  
  public get(connectionName: string): Connection
  {
    if (this.connections[connectionName]) return this.connections[connectionName];
    if (!this.config[connectionName]) throw new Error(`Config for connection "${connectionName}" not found`);
    
    const { host, port, username, password } = this.config[connectionName];
    
    this.connections[connectionName] = new Connection(
      {
        host: host,
        port: port,
        username: username,
        password: password
      },
      this.startTransactionOnInit
    );
    
    return this.connections[connectionName];
  }
  
  public getAllByDatabaseName(databaseName: string): Array<Connection>
  {
    const connections: Array<Connection> = [];
    
    for (const connectionName in this.config)
    {
      if (this.config[connectionName].databases.includes(databaseName))
      {
        connections.push(this.get(connectionName));
      }
    }
    
    return connections;
  }
  
  public getAllInitialised(): Array<Connection>
  {
    return Object.values(this.connections).filter(connection => connection.isInitialised());
  }
}
