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
    console.log('Table constructor', name, tableExists);
    this.connection = connection;
    this.operations = operations;
    this.tableExists = tableExists;
  }

  public id(name: string = "id"): this
  {
    this.operations.push(async () => {
      console.log('id operation', name, this.tableExists);
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
  
  // TODO: renameColumn(currentName, newName)
  // TODO: updateColumn(name, { type, index, nullable, default )
  
  public async execute(): Promise<void>
  {
    for (const operation of this.operations)
    {
      await operation();
    }
  }
}
