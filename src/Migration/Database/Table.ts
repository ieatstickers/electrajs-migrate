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
import { DoubleColumnOptions } from "../Column/Double/DoubleColumnOptions";
import { DoubleColumn } from "../Column/Double/DoubleColumn";
import { TableEncodingEnum } from "./Enum/TableEncodingEnum";
import { TableCollationEnum } from "./Enum/TableCollationEnum";
import { CreateTableOptions } from "./Type/CreateTableOptions";
import { RenameColumnModification } from "../Modification/RenameColumn/RenameColumnModification";
import { ModificationInterface } from "../Modification/ModificationInterface";
import { DropColumnModification } from "../Modification/DropColumn/DropColumnModification";
import { IndexDefinitionTypeEnum } from "../Definition/Enum/IndexDefinitionTypeEnum";
import { IndexDefinition } from "../Definition/IndexDefinition";
import { AddIndexModification } from "../Modification/AddIndex/AddIndexModification";
import { DropIndexModification } from "../Modification/DropIndex/DropIndexModification";
import { SetNullableModification } from "../Modification/SetNullable/SetNullableModification";
import { SetDefaultModification } from "../Modification/SetDefault/SetDefaultModification";
import { DropTableModification } from "../Modification/DropTable/DropTableModification";

export class Table
{
  private readonly name: string;
  private readonly connection: Connection;
  private readonly columnAdditions: Array<ColumnInterface> = [];
  private readonly columnModifications: Array<ModificationInterface> = [];
  private readonly tableModifications: Array<ModificationInterface> = [];
  private tableExists: boolean;

  public constructor(
    name: string,
    connection: Connection,
    operations: Array<() => Promise<void>>,
    tableExists: boolean,
    options?: CreateTableOptions
  )
  {
    this.name = name;
    this.connection = connection;
    this.tableExists = tableExists;
    const tableOptions = Object.assign(
      {},
      {
        encoding: TableEncodingEnum.UTF8MB4,
        collation: TableCollationEnum.UTF8MB4_GENERAL_CI
      },
      options
    );
    
    operations.push(async () => {
      if (
        this.columnAdditions.length === 0
        && this.columnModifications.length === 0
        && this.tableModifications.length === 0
      ) return;
      
      // Create query
      if (!this.tableExists && this.columnAdditions.length > 0)
      {
        const createQuery = this.getCreateTableQuery(this.columnAdditions, tableOptions);
        
        if (createQuery)
        {
          // Create the table
          await this.connection.query(createQuery);
          // Set the table exists flag
          this.tableExists = true;
          // Clear the column additions
          this.columnAdditions.splice(0, this.columnAdditions.length);
        }
      }
      
      // Alter query
      if (this.columnAdditions.length > 0 || this.columnModifications.length > 0)
      {
        const alterQuery = this.getAlterTableQuery(this.columnAdditions, this.columnModifications);
        
        if (alterQuery)
        {
          await this.connection.query(alterQuery);
        }
      }
      
      if (this.tableModifications.length > 0)
      {
        const alterQuery = this.tableModifications.map(mod => mod.getModificationDefinition()).join("; ");
        await this.connection.query(`${alterQuery};`);
      }
      
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

  public double(name: string, options?: Partial<DoubleColumnOptions>): this
  {
    this.columnAdditions.push(new DoubleColumn(name, options));
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
    this.columnModifications.push(new RenameColumnModification(currentName, newName));
    return this;
  }
  
  public dropColumn(name: string): this
  {
    this.columnModifications.push(new DropColumnModification(name));
    return this;
  }
  
  public addIndex(columnNames: Array<string>, name?: string, type?: IndexDefinitionTypeEnum): this
  {
    const indexDefinition = IndexDefinition
      .create()
      .defaultName(this.getDefaultIndexName(...columnNames))
      .columns(...columnNames);
    if (name) indexDefinition.name(name);
    if (type) indexDefinition.type(type);
    this.columnModifications.push(new AddIndexModification(indexDefinition));
    return this;
  }
  
  public dropIndex(name: string): this
  public dropIndex(columnNames: Array<string>): this
  public dropIndex(...args: Array<any>): this
  {
    const [ first ] = args;
    const name = Array.isArray(first) ? this.getDefaultIndexName(...first) : first;
    this.columnModifications.push(new DropIndexModification(name));
    return this;
  }

  public setNullable(columnName: string, nullable: boolean): this
  {
    this.columnModifications.push(new SetNullableModification(columnName, nullable));
    return this;
  }
  
  public setDefault(columnName: string, defaultValue: string | number): this
  {
    this.columnModifications.push(new SetDefaultModification(columnName, defaultValue));
    return this;
  }
  
  public drop(): this
  {
    this.tableModifications.push(new DropTableModification(this.name));
    return this;
  }
  
  private getDefaultIndexName(...columnNames: Array<string>): string
  {
    const columnNamesString = columnNames.sort().join("_").toLowerCase();
    return `${this.name.toLowerCase()}_${columnNamesString}_index`;
  }
  
  private getCreateTableQuery(columnAdditions: Array<ColumnInterface>, tableOptions: CreateTableOptions): string
  {
    // Column definitions
    const columnDefinitions = columnAdditions.map(column => column.getColumnDefinition().get())
    // Index definitions
    const indexDefinitions = columnAdditions
      .map(column => {
        const definition = column.getIndexDefinition();
        if (!definition) return null;
        return definition
          .defaultName(this.getDefaultIndexName(column.getName()))
          .get();
      })
      .filter(definition => definition != null);
    // Combined definitions
    const allDefinitions = [ ...columnDefinitions, ...indexDefinitions ];
    // Charset and collation
    let tableOptionsString = "";
    if (tableOptions.encoding) tableOptionsString += ` DEFAULT CHARACTER SET ${tableOptions.encoding}`;
    if (tableOptions.collation) tableOptionsString += ` DEFAULT COLLATE ${tableOptions.collation}`;
    return `CREATE TABLE \`${this.name}\` (${allDefinitions.join(", ")})${tableOptionsString};`
  }
  
  private getAlterTableQuery(columnAdditions: Array<ColumnInterface>, columnModifications: Array<ModificationInterface>): string
  {
    const columnDefinitions = columnAdditions.map((column) => {
      return `ADD COLUMN ${column.getColumnDefinition().get()}`;
    });
    const indexDefinitions = columnAdditions
      .map((column) => {
        const definition = column.getIndexDefinition();
        if (!definition) return null;
        definition.defaultName(this.getDefaultIndexName(column.getName()))
        return `ADD ${definition.get()}`;
      })
      .filter((definition) => definition != null);
    const modificationDefinitions = columnModifications.map(mod => mod.getModificationDefinition());
    
    const allDefinitions = [ ...columnDefinitions, ...indexDefinitions, ...modificationDefinitions ];
    
    if (allDefinitions.length === 0) return null;
    
    return `ALTER TABLE \`${this.name}\` ${allDefinitions.join(", ")};`;
  }
}
