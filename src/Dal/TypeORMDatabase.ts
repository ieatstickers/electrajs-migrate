import { DatabaseInterface } from "./DatabaseInterface";
import { DataSource, DataSourceOptions } from "typeorm";

export abstract class TypeORMDatabase implements DatabaseInterface
{
  protected dataSource: DataSource;
  
  protected constructor(dataSourceOptions: DataSourceOptions)
  {
    this.dataSource = new DataSource(dataSourceOptions);
  }
  
  public async initialize(): Promise<void>
  {
    await this.dataSource.initialize();
  }
  
  public async destroy(): Promise<void>
  {
    await this.dataSource.destroy();
  }
  
  public abstract transaction(fn: (repositories: { [key: string]: any }) => Promise<void>): Promise<void>;
}
