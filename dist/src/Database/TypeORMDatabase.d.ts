import { DatabaseInterface } from "./DatabaseInterface";
import { DataSource, DataSourceOptions } from "typeorm";
export declare abstract class TypeORMDatabase implements DatabaseInterface {
    protected dataSource: DataSource;
    protected constructor(dataSourceOptions: DataSourceOptions);
    initialize(): Promise<void>;
    destroy(): Promise<void>;
    abstract transaction(fn: (repositories: {
        [key: string]: any;
    }) => Promise<void>): Promise<void>;
}
