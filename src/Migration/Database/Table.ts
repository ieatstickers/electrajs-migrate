import { IntColumnOptions } from "../Column/Int/IntColumnOptions";
import { IntColumn } from "../Column/Int/IntColumn";
import { IdColumn } from "../Column/Id/IdColumn";
import { DecimalColumn } from "../Column/Decimal/DecimalColumn";
import { DecimalColumnOptions } from "../Column/Decimal/DecimalColumnOptions";
import { StringColumn } from "../Column/String/StringColumn";
import { StringColumnOptions } from "../Column/String/StringColumnOptions";
import { DateColumn } from "../Column/Date/DateColumn";
import { DateColumnOptions } from "../Column/Date/DateColumnOptions";
import { TimeColumn } from "../Column/Time/TimeColumn";
import { TimeColumnOptions } from "../Column/Time/TimeColumnOptions";
import { DateTimeColumn } from "../Column/DateTime/DateTimeColumn";
import { DateTimeColumnOptions } from "../Column/DateTime/DateTimeColumnOptions";
import { BlobColumnOptions } from "../Column/Blob/BlobColumnOptions";
import { BlobColumn } from "../Column/Blob/BlobColumn";
import { EnumColumnOptions } from "../Column/Enum/EnumColumnOptions";
import { EnumColumn } from "../Column/Enum/EnumColumn";
import { Connection } from "./Connection";

export class Table
{
  private readonly name: string;
  private readonly connection: Connection;
  private readonly operations: Array<() => Promise<void>> = [];
  private tableExists: boolean;

  public constructor(
    name: string,
    connection: Connection,
    operations: Array<() => Promise<void>>,
    tableExists: boolean
  )
  {
    this.name = name;
    this.connection = connection;
    this.operations = operations;
    this.tableExists = tableExists;
  }

  public id(name: string = "id"): this
  {
    this.operations.push(async () => {
      const column = new IdColumn(name);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    });
    
    return this;
  }

  public int(name: string, options?: Partial<IntColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new IntColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
      
    });
    
    return this;
  }

  public decimal(name: string, options?: Partial<DecimalColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new DecimalColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    });
    
    return this;
  }

  public string(name: string, options?: Partial<StringColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new StringColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    });
    
    return this;
  }

  public enum(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new EnumColumn(name, values, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    })
    
    return this;
  }

  public date(name: string, options?: Partial<DateColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new DateColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    })
    
    return this;
  }

  public time(name: string, options?: Partial<TimeColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new TimeColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    });
    
    return this;
  }

  public datetime(name: string, options?: Partial<DateTimeColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new DateTimeColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    })
    
    return this;
  }

  public blob(name: string, options?: Partial<BlobColumnOptions>): this
  {
    this.operations.push(async () => {
      const column = new BlobColumn(name, options);
      await column.create(this.connection, this.name, !this.tableExists);
      this.tableExists = true;
    })
    
    return this;
  }
  
  public renameColumn(currentName: string, newName: string): this
  {
    this.operations.push(async () => {
      await this.connection.query(`ALTER TABLE ${await this.connection.escape(this.name)} RENAME COLUMN ${await this.connection.escape(currentName)} TO ${await this.connection.escape(newName)};`);
    });
    
    return this;
  }
  
  public dropColumn(name: string): this
  {
    this.operations.push(async () => {
      await this.connection.query(`ALTER TABLE ${await this.connection.escape(this.name)} DROP COLUMN ${await this.connection.escape(name)};`);
    });
    
    return this;
  }
  
  public addColumnIndex(columnName: string): this
  {
    this.operations.push(async () => {
      await this.connection.query(`ALTER TABLE ${await this.connection.escape(this.name)} ADD INDEX ${await this.connection.escape(columnName)};`);
    });
    
    return this;
  }

  public dropColumnIndex(columnName: string): this
  {
    this.operations.push(async () => {
      await this.connection.query(`ALTER TABLE ${await this.connection.escape(this.name)} DROP INDEX ${await this.connection.escape(columnName)};`);
    });
    
    return this;
  }
  
  public setColumnNullable(columnName: string, nullable: boolean): this
  {
    this.operations.push(async () => {
      await this.connection.query(`ALTER TABLE ${await this.connection.escape(this.name)} MODIFY COLUMN ${await this.connection.escape(columnName)} ${nullable ? "NULL" : "NOT NULL"};`);
    });
    
    return this;
  }
  
  public setColumnDefault(columnName: string, defaultValue: string | number): this
  {
    this.operations.push(async () => {
      await this.connection.query(`ALTER TABLE ${await this.connection.escape(this.name)} MODIFY COLUMN ${await this.connection.escape(columnName)} DEFAULT ${typeof defaultValue === "string" ? `'${defaultValue}'` : defaultValue};`);
    });
    
    return this;
  }
  
  public drop(): this
  {
    this.operations.push(async () => {
      await this.connection.query(`DROP TABLE ${await this.connection.escape(this.name)};`);
    });
    
    return this;
  }
}
