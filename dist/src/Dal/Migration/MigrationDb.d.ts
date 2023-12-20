import { TypeORMDatabase } from "../TypeORMDatabase";
import { MigrationRepositoryInterface } from "./Repository/Migration/MigrationRepositoryInterface";
type ConnectionOptions = {
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
};
type Repositories = {
    migration: MigrationRepositoryInterface;
};
export declare class MigrationDb extends TypeORMDatabase {
    constructor(connectionOptions: ConnectionOptions);
    transaction(fn: (repositories: Repositories) => Promise<void>): Promise<void>;
    getMigrationRepository(): MigrationRepositoryInterface;
}
export {};
