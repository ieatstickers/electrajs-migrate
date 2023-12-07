import { TypeORMDatabase } from './TypeORMDatabase';
import { DataSource, DataSourceOptions } from 'typeorm';

jest.mock('typeorm', () => {
  const originalModule = jest.requireActual('typeorm');
  
  return {
    ...originalModule,
    DataSource: jest.fn(),
  };
});

class TestDatabase extends TypeORMDatabase {
  
  public static create(dataSourceOptions: DataSourceOptions): TestDatabase
  {
    return new TestDatabase(dataSourceOptions);
  }
  
  public async transaction(fn: (repositories: { [key: string]: any }) => Promise<void>): Promise<void> {}
}

describe('TypeORMDatabase', () => {
  
  const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
  };
  let testDatabase: TestDatabase;
  let mockInitialize: jest.Mock;
  let mockDestroy: jest.Mock;
  
  beforeEach(() => {
    mockInitialize = jest.fn();
    mockDestroy = jest.fn();
    
    (DataSource as jest.Mock).mockImplementation(() => ({
      initialize: mockInitialize,
      destroy: mockDestroy,
    }));
    
    testDatabase = TestDatabase.create(dataSourceOptions);
  });
  
  describe("initialize", () => {
    
    it('calls dataSource.initialize', async () => {
      await testDatabase.initialize();
      expect(mockInitialize).toHaveBeenCalledTimes(1);
    });
    
  });
  
  describe("destroy", () => {
    
    it('calls dataSource.destroy', async () => {
      await testDatabase.destroy();
      expect(mockDestroy).toHaveBeenCalledTimes(1);
    });
    
  });

});
