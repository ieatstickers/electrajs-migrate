import { MigrationRepositoryInterface } from "./MigrationRepositoryInterface";
import { AbstractRepository } from "../AbstractRepository";
import { MigrationModel } from "./MigrationModel";
import { Migration } from "./Migration";
import { Objects } from "@electra/utility";
import { DateTime } from "luxon";

export class MigrationRepository extends AbstractRepository implements MigrationRepositoryInterface
{
  public async getAll(): Promise<{ [id: number]: Migration }>
  {
    return this.toEntityMap(await this.entityManager.find(MigrationModel))
  }
  
  public async getById(id: number): Promise<Migration>
  {
    return this.toEntity(
      await this.entityManager.findOneBy(MigrationModel, { id: id })
    );
  }
  
  public async getLatestBatch(): Promise<number>
  {
    const result = await this.entityManager
      .createQueryBuilder(MigrationModel, "migration")
      .select("MAX(migration.batch)", "maxBatch")
      .getRawOne();
    
    return result && result.maxBatch ? parseInt(result.maxBatch) : null;
  }
  
  public async getAllByBatch(batch: number): Promise<{ [id: number]: Migration }>
  {
    return this.toEntityMap(
      await this
        .entityManager
        .createQueryBuilder(MigrationModel, "m")
        .where("m.batch = :batch", { batch: batch })
        .orderBy("executed", "DESC")
        .getMany()
    );
  }
  
  public async remove(...migrations: Array<Migration>): Promise<void>
  {
    await this.entityManager.remove(migrations.map(migration => this.toModel(migration)));
  }
  
  public async save(...migrations: Array<Migration>): Promise<void>
  {
    await this.entityManager.save(
      migrations.map(migration => {
        const now = DateTime.now().toSQL({ includeOffset: false });
        if (!migration.id) migration.created = now;
        migration.updated = now;
        return this.toModel(migration);
      })
    );
  }
  
  private toEntityMap(models: Array<MigrationModel>): { [id: number]: Migration }
  {
    const entities: { [id: number]: Migration } = {};
    
    models.forEach((model) => {
      entities[model.id] = this.toEntity(model);
    });
    
    return entities;
  }
  
  private toEntity(model: MigrationModel): Migration
  {
    return Objects.hydrate(new Migration(), model);
  }
  
  private toModel(entity: Migration): MigrationModel
  {
    return Objects.hydrate(new MigrationModel(), entity);
  }
  
  public getModel(): Function
  {
    return MigrationModel;
  }
}
