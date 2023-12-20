import { EntityManager } from "typeorm";

export abstract class AbstractRepository
{
  protected entityManager: EntityManager;
  
  public constructor(entityManager: EntityManager)
  {
    this.entityManager = entityManager;
  }
  
  public abstract getModel(): Function;
}
