import { TypeORMDatabase } from "../TypeORMDatabase";
import { MigrationRepositoryInterface } from "./Repository/Migration/MigrationRepositoryInterface";
import { MigrationRepository } from "./Repository/Migration/MigrationRepository";
import { MigrationModel } from "./Repository/Migration/MigrationModel";

type ConnectionOptions = {
  database: string,
  host: string,
  port: number,
  username: string,
  password: string
};

type Repositories = {
  migration: MigrationRepositoryInterface
}

export class MigrationDb extends TypeORMDatabase
{
  public constructor(connectionOptions: ConnectionOptions)
  {
    super({
      type: "mysql",
      database: connectionOptions.database,
      host: connectionOptions.host,
      port: connectionOptions.port,
      username: connectionOptions.username,
      password: connectionOptions.password,
      entities: [ MigrationModel ]
    });
  }
  
  public async transaction(fn: (repositories: Repositories) => Promise<void>): Promise<void>
  {
    await this.dataSource.transaction(async (entityManager) => {
      const repositories: Repositories = {
        migration: new MigrationRepository(entityManager)
      };
      
      return fn(repositories);
    })
  }
  
  public getMigrationRepository(): MigrationRepositoryInterface
  {
    return new MigrationRepository(this.dataSource.manager);
  }
}
