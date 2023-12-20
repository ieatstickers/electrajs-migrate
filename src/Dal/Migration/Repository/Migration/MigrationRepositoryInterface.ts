import { Migration } from "./Migration";

export interface MigrationRepositoryInterface
{
  getAll(): Promise<{ [id: number]: Migration }>;
  getById(id: number): Promise<Migration>;
  getLatestBatch(): Promise<number>;
  getAllByBatch(batch: number): Promise<{ [id: number]: Migration }>;
  remove(...migrations: Array<Migration>): Promise<void>;
  save(...migrations: Array<Migration>): Promise<void>;
}
