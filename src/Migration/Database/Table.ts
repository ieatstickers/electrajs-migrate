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
import { ColumnInterface } from "../Column/ColumnInterface";

export class Table
{
  private readonly name: string;
  private readonly connection: Connection;
  private readonly operations: Array<() => Promise<void>> = [];
  private readonly columnAdditions: Array<ColumnInterface> = [];
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
    
    this.operations.push(async () => {
      if (this.columnAdditions.length === 0) return;
      
      const escapedTableName = await this.connection.escape(this.name);
      
      if (!this.tableExists)
      {
        // Get all column definitions
        const columnDefinitions = this.columnAdditions.map(column => column.getColumnDefinition().get())
        // Get all index definitions
        const indexDefinitions = this.columnAdditions
          .map(column => {
            const definition = column.getIndexDefinition();
            return definition
              ? definition
                .defaultName(`${this.name.toLowerCase()}_${column.getName().toLowerCase()}_index`)
                .get()
              : null;
          })
          .filter(definition => definition != null);
        // Combine all definitions
        const allDefinitions = [ ...columnDefinitions, ...indexDefinitions ];
        // Create the table
        await this.connection.query(`CREATE TABLE ${escapedTableName} (${allDefinitions.join(", ")});`);
        // Set the table exists flag
        this.tableExists = true;
        // Clear the column additions
        this.columnAdditions.splice(0, this.columnAdditions.length);
      }
      
      const columnDefinitions = this.columnAdditions.map((column) => {
        return `ADD COLUMN ${column.getColumnDefinition().get()}`;
      });
      const indexDefinitions = this.columnAdditions
        .map((column) => {
          const definition = column.getIndexDefinition();
          if (!definition) return null;
          definition.defaultName(`${this.name.toLowerCase()}_${column.getName().toLowerCase()}_index`)
          return `ADD ${definition.get()}`;
        })
        .filter((definition) => definition != null);
      
      const allDefinitions = [ ...columnDefinitions, ...indexDefinitions ];
      
      if (allDefinitions.length === 0) return;
      await this.connection.query(`ALTER TABLE ${escapedTableName} ${allDefinitions.join(", ")};`);
    });
  }

  public id(name: string = "id"): this
  {
    this.columnAdditions.push(new IdColumn(name));
    return this;
  }

  public int(name: string, options?: Partial<IntColumnOptions>): this
  {
    this.columnAdditions.push(new IntColumn(name, options));
    return this;
  }

  public decimal(name: string, options?: Partial<DecimalColumnOptions>): this
  {
    this.columnAdditions.push(new DecimalColumn(name, options));
    return this;
  }

  public string(name: string, options?: Partial<StringColumnOptions>): this
  {
    this.columnAdditions.push(new StringColumn(name, options));
    return this;
  }

  public enum(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>): this
  {
    this.columnAdditions.push(new EnumColumn(name, values, options));
    return this;
  }

  public date(name: string, options?: Partial<DateColumnOptions>): this
  {
    this.columnAdditions.push(new DateColumn(name, options));
    return this;
  }

  public time(name: string, options?: Partial<TimeColumnOptions>): this
  {
    this.columnAdditions.push(new TimeColumn(name, options));
    return this;
  }

  public datetime(name: string, options?: Partial<DateTimeColumnOptions>): this
  {
    this.columnAdditions.push(new DateTimeColumn(name, options));
    return this;
  }

  public blob(name: string, options?: Partial<BlobColumnOptions>): this
  {
    this.columnAdditions.push(new BlobColumn(name, options));
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
