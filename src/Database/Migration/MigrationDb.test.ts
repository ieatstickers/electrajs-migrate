import { MigrationDb } from './MigrationDb';
import { DataSource, EntityManager } from 'typeorm';
import { MigrationRepository } from './Repository/Migration/MigrationRepository';

jest.mock('typeorm', () => {
  const originalModule = jest.requireActual('typeorm');
  return {
    ...originalModule,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn(),
      destroy: jest.fn(),
      transaction: jest.fn((transactionCallback) => {
        const entityManager = new EntityManager({} as any);
        return transactionCallback(entityManager);
      }),
      manager: {},
    })),
  };
});

jest.mock('./Repository/Migration/MigrationRepository');

describe('MigrationDb', () => {
  let migrationDb: MigrationDb;
  let mockDataSource: jest.Mocked<DataSource>;
  
  beforeEach(() => {
    mockDataSource = new DataSource({ type: 'mysql' }) as jest.Mocked<DataSource>;
    
    const connectionOptions = {
      database: 'test',
      host: 'localhost',
      port: 3306,
      username: 'username',
      password: 'password'
    };
    
    migrationDb = new MigrationDb(connectionOptions);
    migrationDb['dataSource'] = mockDataSource;
  });
  
  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  
  describe("transaction", () => {
    
    it('performs a transaction with the provided function', async () => {
      const mockTransactionCallback = jest.fn();
      await migrationDb.transaction(async (repositories) => {
        mockTransactionCallback();
      });
      
      expect(mockDataSource.transaction).toHaveBeenCalledTimes(1);
      expect(mockTransactionCallback).toHaveBeenCalledTimes(1);
    });
    
  });
  
  describe("getMigrationRepository", () => {
    
    it('returns a MigrationRepository instance', () => {
      const repository = migrationDb.getMigrationRepository();
      expect(repository).toBeInstanceOf(MigrationRepository);
    });
    
  });
  
});
