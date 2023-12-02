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
  private readonly startTransactionOnInit: boolean = false;
  
  public constructor(connection: ConnectionConfig, startTransactionOnInit: boolean = false)
  {
    this.connectionConfig = connection;
    this.startTransactionOnInit = startTransactionOnInit;
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
  
  public async startTransaction(): Promise<void>
  {
    if (this.queryRunner) throw new Error("Transaction already started.");
    
    console.log('starting transaction');
    const connection = await this.get();
    this.queryRunner = connection.createQueryRunner();
    await this.queryRunner.startTransaction();
  }
  
  public async commitTransaction(): Promise<void>
  {
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
    this.queryRunner = undefined;
  }
  
  public async rollbackTransaction(): Promise<void>
  {
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
    this.queryRunner = undefined;
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
      
      console.log('Connection initialised');
      if (this.startTransactionOnInit)
      {
        await this.startTransaction();
      }
    }
    
    return this.connection;
  }
}
