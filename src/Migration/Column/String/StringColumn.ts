import { StringColumnTypeEnum } from "./StringColumnTypeEnum";
import { StringColumnOptions } from "./StringColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { Connection } from "../../Database/Connection";

export class StringColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: StringColumnOptions;
  
  public constructor(name: string, options?: Partial<StringColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.options = {
      type: StringColumnTypeEnum.VARCHAR,
      nullable: false,
      primaryKey: false,
      default: undefined,
      length: options?.type && options?.type !== StringColumnTypeEnum.VARCHAR ? undefined : 255,
      index: false,
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
        index: Validators.boolean()
      }
    );
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
    this.options.nullable
      ? columnDefinition += " NULL"
      : columnDefinition += " NOT NULL";
    
    // primaryKey
    if (this.options.primaryKey) columnDefinition += " PRIMARY KEY";
    
    // default
    if (this.options.default !== undefined) columnDefinition += ` DEFAULT ${await connection.escape(this.options.default)}`;
    
    // index
    if (this.options.index) columnDefinition += " INDEX";
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE IF NOT EXISTS ${escapedTableName}(${columnDefinition});`);
    }
    // Add column to existing table
    else
    {
      await connection.query(`ALTER TABLE ${escapedTableName} ADD COLUMN ${columnDefinition};`);
    }
  }
}
