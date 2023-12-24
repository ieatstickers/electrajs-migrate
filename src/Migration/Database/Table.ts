import { IntColumn } from "../Column/Int/IntColumn";
import { DecimalColumn } from "../Column/Decimal/DecimalColumn";
import { StringColumn } from "../Column/String/StringColumn";
import { DateColumn } from "../Column/Date/DateColumn";
import { TimeColumn } from "../Column/Time/TimeColumn";
import { DateTimeColumn } from "../Column/DateTime/DateTimeColumn";
import { BlobColumn } from "../Column/Blob/BlobColumn";
import { EnumColumn } from "../Column/Enum/EnumColumn";
import { Connection } from "./Connection";
import { ColumnInterface } from "../Column/ColumnInterface";
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
import { TinyBlobColumn } from "../Column/Blob/TinyBlobColumn";
import { MediumBlobColumn } from "../Column/Blob/MediumBlobColumn";
import { LongBlobColumn } from "../Column/Blob/LongBlobColumn";
import { SmallIntColumn } from "../Column/Int/SmallIntColumn";
import { TinyIntColumn } from "../Column/Int/TinyIntColumn";
import { MediumIntColumn } from "../Column/Int/MediumIntColumn";
import { BigIntColumn } from "../Column/Int/BigIntColumn";
import { TextColumn } from "../Column/Text/TextColumn";
import { TinyTextColumn } from "../Column/Text/TinyTextColumn";
import { MediumTextColumn } from "../Column/Text/MediumTextColumn";
import { LongTextColumn } from "../Column/Text/LongTextColumn";

export class Table
{
  private readonly name: string;
  private readonly connection: Connection;
  private readonly columns: Array<ColumnInterface> = [];
  private readonly alterModifications: Array<ModificationInterface> = [];
  private readonly standaloneModifications: Array<ModificationInterface> = [];
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
        this.columns.length === 0
        && this.alterModifications.length === 0
        && this.standaloneModifications.length === 0
      ) return;
      
      const { columnsToAdd, columnsToModify } = this
        .columns
        .reduce((acc, column) => {
          column.exists() ? acc.columnsToModify.push(column) : acc.columnsToAdd.push(column);
          return acc;
        }, { columnsToAdd: [], columnsToModify: [] });
      
      await Promise.all(
        columnsToModify.map((column: ColumnInterface) => {
          return column.getColumnDefinition().hydrateExistingOptions(this.connection, column.getName(), this.name);
        })
      );
      
      // Create query
      if (!this.tableExists && columnsToAdd.length > 0)
      {
        const createQuery = this.getCreateTableQuery(columnsToAdd, tableOptions);
        
        if (createQuery)
        {
          // Create the table
          await this.connection.query(createQuery);
          // Set the table exists flag
          this.tableExists = true;
          // Clear the column additions
          columnsToAdd.splice(0, columnsToAdd.length);
        }
      }
      
      // Alter query
      if (columnsToAdd.length > 0 || columnsToModify.length > 0 || this.alterModifications.length > 0)
      {
        const alterQuery = this.getAlterTableQuery(columnsToAdd, columnsToModify, this.alterModifications);
        
        if (alterQuery)
        {
          await this.connection.query(alterQuery);
        }
      }
      
      if (this.standaloneModifications.length > 0)
      {
        const alterQuery = this.standaloneModifications.map(mod => mod.getModificationDefinition()).join("; ");
        await this.connection.query(`${alterQuery};`);
      }
      
    });
  }

  public id(name: string = "id"): IntColumn
  {
    const column = (new IntColumn(name))
      .unsigned()
      .autoIncrement()
      .primaryKey();
    this.columns.push(column);
    return column;
  }

  public int(name: string): IntColumn
  {
    const column = new IntColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public tinyint(name: string): TinyIntColumn
  {
    const column = new TinyIntColumn(name);
    this.columns.push(column);
    return column;
  }

  public smallint(name: string): SmallIntColumn
  {
    const column = new SmallIntColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public mediumint(name: string): MediumIntColumn
  {
    const column = new MediumIntColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public bigint(name: string): BigIntColumn
  {
    const column = new BigIntColumn(name);
    this.columns.push(column);
    return column;
  }

  public decimal(name: string, precision: number = 8, scale: number = 2): DecimalColumn
  {
    const column = new DecimalColumn(name, precision, scale);
    this.columns.push(column);
    return column;
  }

  public double(name: string, precision?: number, scale?: number): DoubleColumn
  {
    const column = new DoubleColumn(name, precision, scale);
    this.columns.push(column);
    return column;
  }

  public string(name: string, length: number = 255): StringColumn
  {
    const column = new StringColumn(name, length);
    this.columns.push(column);
    return column;
  }
  
  public text(name: string): TextColumn
  {
    const column = new TextColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public tinytext(name: string): TinyTextColumn
  {
    const column = new TinyTextColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public mediumtext(name: string): MediumTextColumn
  {
    const column = new MediumTextColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public longtext(name: string): LongTextColumn
  {
    const column = new LongTextColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public enum(name: string, values: Array<string>): EnumColumn
  {
    const column = new EnumColumn(name, values);
    this.columns.push(column);
    return column;
  }

  public date(name: string): DateColumn
  {
    const column = new DateColumn(name);
    this.columns.push(column);
    return column;
  }

  public time(name: string): TimeColumn
  {
    const column = new TimeColumn(name);
    this.columns.push(column);
    return column;
  }

  public datetime(name: string): DateTimeColumn
  {
    const column = new DateTimeColumn(name);
    this.columns.push(column);
    return column;
  }

  public blob(name: string): BlobColumn
  {
    const column = new BlobColumn(name);
    this.columns.push(column);
    return column;
  }

  public tinyblob(name: string): TinyBlobColumn
  {
    const column = new TinyBlobColumn(name);
    this.columns.push(column);
    return column;
  }

  public mediumblob(name: string): MediumBlobColumn
  {
    const column = new MediumBlobColumn(name);
    this.columns.push(column);
    return column;
  }

  public longblob(name: string): LongBlobColumn
  {
    const column = new LongBlobColumn(name);
    this.columns.push(column);
    return column;
  }
  
  public renameColumn(currentName: string, newName: string): this
  {
    this.alterModifications.push(new RenameColumnModification(currentName, newName));
    return this;
  }
  
  public dropColumn(name: string): this
  {
    this.alterModifications.push(new DropColumnModification(name));
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
    this.alterModifications.push(new AddIndexModification(indexDefinition));
    return this;
  }
  
  public dropIndex(name: string): this
  public dropIndex(columnNames: Array<string>): this
  public dropIndex(...args: Array<any>): this
  {
    const [ first ] = args;
    const name = Array.isArray(first) ? this.getDefaultIndexName(...first) : first;
    this.alterModifications.push(new DropIndexModification(name));
    return this;
  }

  public setNullable(columnName: string, nullable: boolean): this
  {
    this.alterModifications.push(new SetNullableModification(columnName, nullable));
    return this;
  }
  
  public setDefault(columnName: string, defaultValue: string | number): this
  {
    this.alterModifications.push(new SetDefaultModification(columnName, defaultValue));
    return this;
  }
  
  public drop(): this
  {
    this.standaloneModifications.push(new DropTableModification(this.name));
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
    
    // Build full query
    return `CREATE TABLE \`${this.name}\` (${allDefinitions.join(", ")})${tableOptionsString};`
  }
  
  private getAlterTableQuery(
    columnAdditions: Array<ColumnInterface>,
    columnModifications: Array<ColumnInterface>,
    alterModifications: Array<ModificationInterface>
  ): string
  {
    // Columns to add
    const addColumnDefinitions = columnAdditions.map((column) => {
      return `ADD COLUMN ${column.getColumnDefinition().get()}`;
    });
    
    // Index definitions
    const indexDefinitions = columnAdditions
      .map((column) => {
        const definition = column.getIndexDefinition();
        if (!definition) return null;
        definition.defaultName(this.getDefaultIndexName(column.getName()))
        return `ADD ${definition.get()}`;
      })
      .filter((definition) => definition != null);
    
    // Modifications
    const modificationDefinitions = [
      ...columnModifications.map(mod => `MODIFY COLUMN ${mod.getColumnDefinition().get()}`),
      ...alterModifications.map(mod => mod.getModificationDefinition())
    ];
    
    const allDefinitions = [ ...addColumnDefinitions, ...indexDefinitions, ...modificationDefinitions ];
    
    if (allDefinitions.length === 0) return null;
    
    return `ALTER TABLE \`${this.name}\` ${allDefinitions.join(", ")};`;
  }
}
