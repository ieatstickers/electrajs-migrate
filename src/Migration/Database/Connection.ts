import { DataSource } from "typeorm";

type ConnectionConfig = {
  host: string,
  port: number,
  username: string,
  password: string
};

export class Connection
{
  private readonly connectionConfig: ConnectionConfig;
  private connection: DataSource;
  
  public constructor(connection: ConnectionConfig)
  {
    this.connectionConfig = connection;
  }
  
  public async query(query: string, parameters: Array<any> = []): Promise<any>
  {
    const connection = await this.get();
    return connection.query(query, parameters);
  }
  
  public async destroy(): Promise<void>
  {
    if (this.connection)
    {
      await this.connection.destroy();
      this.connection = undefined;
    }
  }
  
  public isInitialised(): boolean
  {
    return !!this.connection;
  }
  
  public async escape(name: string): Promise<string>
  {
    const connection = await this.get();
    return connection.driver.escape(name);
  }
  
  private async get(): Promise<DataSource>
  {
    if (!this.connection)
    {
      this.connection = new DataSource({
        type: "mysql",
        host: this.connectionConfig.host,
        port: this.connectionConfig.port,
        username: this.connectionConfig.username,
        password: this.connectionConfig.password
      });
      
      await this.connection.initialize();
    }
    
    return this.connection;
  }
}
