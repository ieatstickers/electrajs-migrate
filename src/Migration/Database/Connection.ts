import { DataSource, QueryRunner } from "typeorm";

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
  private queryRunner: QueryRunner;
  
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
    if (this.queryRunner)
    {
      await this.queryRunner.release();
      this.queryRunner = undefined;
    }
    
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