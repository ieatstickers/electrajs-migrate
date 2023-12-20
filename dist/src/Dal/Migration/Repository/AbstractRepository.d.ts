import { EntityManager } from "typeorm";
export declare abstract class AbstractRepository {
    protected entityManager: EntityManager;
    constructor(entityManager: EntityManager);
    abstract getModel(): Function;
}
