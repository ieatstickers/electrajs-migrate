import { DateColumnOptions } from "./DateColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Validators } from "@electra/utility";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";

export class DateColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: DateColumnOptions;
  
  public constructor(name: string, options?: Partial<DateColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.options = {
      nullable: false,
      default: undefined,
      index: false,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.regex(
          /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
          'YYYY-MM-DD',
          { optional: true }
        ),
        index: Validators.boolean()
      }
    );
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    // type
    let columnDefinition = `${this.name} DATE`;
    
    // nullable
    this.options.nullable
      ? columnDefinition += " NULL"
      : columnDefinition += " NOT NULL";
    
    // default
    if (this.options.default !== undefined) columnDefinition += ` DEFAULT ${this.options.default}`;
    
    // index
    if (this.options.index) columnDefinition += " INDEX";
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE IF NOT EXISTS ${tableName}(${columnDefinition});`);
    }
    // Add column to existing table
    else
    {
      await connection.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition};`);
    }
  }
}
