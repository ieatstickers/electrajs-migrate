import { MigrationRepositoryInterface } from "./MigrationRepositoryInterface";
import { AbstractRepository } from "../AbstractRepository";
import { Migration } from "./Migration";
export declare class MigrationRepository extends AbstractRepository implements MigrationRepositoryInterface {
    getAll(): Promise<{
        [id: number]: Migration;
    }>;
    getById(id: number): Promise<Migration>;
    getLatestBatch(): Promise<number>;
    getAllByBatch(batch: number): Promise<{
        [id: number]: Migration;
    }>;
    remove(...migrations: Array<Migration>): Promise<void>;
    save(...migrations: Array<Migration>): Promise<void>;
    private toEntityMap;
    private toEntity;
    private toModel;
    getModel(): Function;
}
