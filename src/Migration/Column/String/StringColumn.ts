import { StringColumnTypeEnum } from "./StringColumnTypeEnum";
import { StringColumnOptions } from "./StringColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { Connection } from "../../Database/Connection";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";

export class StringColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: StringColumnOptions;
  
  public constructor(name: string, options?: Partial<StringColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    const type = options?.type || StringColumnTypeEnum.VARCHAR;
    
    this.options = {
      type: type,
      nullable: false,
      primaryKey: false,
      default: undefined,
      length: type !== StringColumnTypeEnum.VARCHAR ? undefined : 255,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        type: Validators.enumValue(StringColumnTypeEnum),
        nullable: Validators.boolean(),
        primaryKey: Validators.boolean(),
        default: Validators.string({ optional: true }),
        length: Validators.integer({ optional: true }),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    let columnType: string = this.options.type;
    
    if (this.options.type === StringColumnTypeEnum.CHAR || this.options.type === StringColumnTypeEnum.VARCHAR)
    {
      if (this.options.length !== undefined) columnType += `(${this.options.length})`;
    }
    
    return ColumnDefinition
      .create(this.name, columnType)
      .nullable(this.options.nullable)
      .primaryKey(this.options.primaryKey)
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
    let columnDefinition = `${escapedColumnName} ${this.options.type}`;
    
    // if CHAR or VARCHAR
    if (this.options.type === StringColumnTypeEnum.CHAR || this.options.type === StringColumnTypeEnum.VARCHAR)
    {
      // length
      if (this.options.length !== undefined) columnDefinition += `(${this.options.length})`;
    }
    
    // nullable
    columnDefinition = this.addNullableStatement(columnDefinition, this.options.nullable);
    
    // primaryKey
    columnDefinition = this.addPrimaryKeyStatement(columnDefinition, this.options.primaryKey);
    
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
