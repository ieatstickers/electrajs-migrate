import { DateTimeColumnOptions } from "./DateTimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { Connection } from "../../Database/Connection";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";

export class DateTimeColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: DateTimeColumnOptions;
  
  public constructor(name: string, options?: Partial<DateTimeColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.options = {
      nullable: false,
      default: undefined,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.regex(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
          'YYYY-MM-DD HH:MM:SS',
          { optional: true }
        ),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, "DATETIME")
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
      .after(this.options.addAfter);
  }
  
  public getIndexDefinition(): IndexDefinition
  {
    if (!this.options.index) return null;
    
    return IndexDefinition
      .create()
      .columns(this.name);
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    const escapedColumnName = await connection.escape(this.name);
    const escapedTableName = await connection.escape(tableName);
    
    // type
    let columnDefinition = `${escapedColumnName} DATETIME`;
    
    // nullable
    columnDefinition = this.addNullableStatement(columnDefinition, this.options.nullable);
    
    // default
    columnDefinition = this.addDefaultStatement(
      columnDefinition,
      this.options.default ? `'${this.options.default}'` : undefined
    );
    
    // after
    columnDefinition = this.addAfterStatement(
      columnDefinition,
      this.options.addAfter ? await connection.escape(this.options.addAfter) : undefined,
      !createTable
    );
    
    let query = createTable
      ? `CREATE TABLE ${escapedTableName} (${columnDefinition})`
      : `ALTER TABLE ${escapedTableName} ADD COLUMN ${columnDefinition}`;
    
    // index
    query = this.addIndexStatement(query, this.options.index, escapedColumnName);
    
    await connection.query(`${query};`);
  }
}
