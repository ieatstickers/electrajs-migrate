import { MigrationRepository } from './MigrationRepository';
import { EntityManager, SelectQueryBuilder } from "typeorm";
import { MigrationModel } from './MigrationModel';
import { Migration } from './Migration';
import { DateTime } from 'luxon';

jest.mock('typeorm', () => {
  const typeorm = jest.requireActual('typeorm');
  return {
    ...typeorm,
    EntityManager: jest.fn().mockImplementation(() => ({
      find: jest.fn(),
      findOneBy: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn(),
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn(),
      })),
      remove: jest.fn(),
      save: jest.fn(),
    })),
  };
});

describe('MigrationRepository', () => {
  let mockEntityManager: jest.Mocked<EntityManager>;
  let repository: MigrationRepository;
  
  beforeEach(() => {
    mockEntityManager = new EntityManager({} as any) as jest.Mocked<EntityManager>;
    repository = new MigrationRepository(mockEntityManager);
  });
  
  describe("getAll", () => {
    
    it('returns a map of migrations', async () => {
      
      const mockMigrationOne = new MigrationModel();
      mockMigrationOne.id = 1;
      const mockMigrationTwo = new MigrationModel();
      mockMigrationTwo.id = 2;
      
      const mockMigrations = [mockMigrationOne, mockMigrationTwo];
      (mockEntityManager.find as jest.Mock).mockResolvedValue(mockMigrations);
      
      const result = await repository.getAll();
      
      expect(mockEntityManager.find).toHaveBeenCalledWith(MigrationModel);
      expect(result).toBeInstanceOf(Object);
      expect(result).toEqual({
        1: mockMigrationOne,
        2: mockMigrationTwo
      });
    });
    
  });
  
  describe("getById", () => {
  
    it('returns a specific migration', async () => {
      const mockMigration = new MigrationModel();
      (mockEntityManager.findOneBy as jest.Mock).mockResolvedValue(mockMigration);
      
      const id = 1;
      const result = await repository.getById(id);
      
      expect(mockEntityManager.findOneBy).toHaveBeenCalledWith(MigrationModel, { id: id });
      expect(result).toBeInstanceOf(Migration);
    });
  
  });
  
  describe("getLatestBatch", () => {
    
    it('returns the latest batch number if a value is found', async () => {
      
      const mockResult = { maxBatch: '5' };
      
      const selectQueryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(mockResult),
      } as Partial<SelectQueryBuilder<MigrationModel>>;
      
      mockEntityManager.createQueryBuilder = jest.fn(() => selectQueryBuilderMock as SelectQueryBuilder<MigrationModel>);
      
      const result = await repository.getLatestBatch();
      
      expect(mockEntityManager.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilderMock.getRawOne).toHaveBeenCalledTimes(1);
      expect(result).toBe(5);
    });
    
    it('returns null if no value is found', async () => {
      
      const selectQueryBuilderMock = {
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(null),
      } as Partial<SelectQueryBuilder<MigrationModel>>;
      
      mockEntityManager.createQueryBuilder = jest.fn(() => selectQueryBuilderMock as SelectQueryBuilder<MigrationModel>);
      
      const result = await repository.getLatestBatch();
      
      expect(mockEntityManager.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilderMock.getRawOne).toHaveBeenCalledTimes(1);
      expect(result).toBe(null);
    });
    
  });
  
  describe("getAllByBatch", () => {
    it('returns all migrations of a specific batch', async () => {
      const migrationOne = new MigrationModel();
      migrationOne.id = 1;
      const migrationTwo = new MigrationModel();
      migrationTwo.id = 2;
      
      const mockMigrations = [migrationOne, migrationTwo];
      
      const selectQueryBuilderMock = {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockMigrations),
      } as Partial<SelectQueryBuilder<MigrationModel>>;
      
      mockEntityManager.createQueryBuilder = jest.fn(() => selectQueryBuilderMock as SelectQueryBuilder<MigrationModel>);
      
      const batch = 1;
      const result = await repository.getAllByBatch(batch);
      
      expect(mockEntityManager.createQueryBuilder).toHaveBeenCalled();
      expect(selectQueryBuilderMock.getMany).toHaveBeenCalled();
      expect(result).toBeInstanceOf(Object);
      expect(Object.keys(result).length).toBe(mockMigrations.length);
      expect(Object.values(result).every(migration => migration instanceof Migration)).toBe(true);
    });
  });
  
  describe("remove", () => {
  
    it('removes the provided migrations', async () => {
      const migrations = [new Migration(), new Migration()];
      await repository.remove(...migrations);
      
      expect(mockEntityManager.remove).toHaveBeenCalledWith(migrations);
    });
  
  });
  
  describe("save", () => {
    
    it('saves the provided migrations', async () => {
      const migrations = [new Migration(), new Migration()];
      DateTime.now = jest.fn(() => DateTime.fromISO('2023-01-01T00:00:00'));
      
      await repository.save(...migrations);
      
      expect(mockEntityManager.save).toHaveBeenCalledWith(migrations);
      migrations.forEach(migration => {
        expect(migration.updated).toBe(DateTime.fromISO('2023-01-01T00:00:00').toSQL({ includeOffset: false }));
      });
    });
    
  });
  
  describe("getModel", () => {
    
    it('returns the MigrationModel class', () => {
      const model = repository.getModel();
      expect(model).toBe(MigrationModel);
    });
    
  });
});
