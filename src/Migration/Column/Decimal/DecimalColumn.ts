import { DecimalColumnOptions } from "./DecimalColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { Connection } from "../../Database/Connection";

export class DecimalColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: DecimalColumnOptions;
  
  public constructor(name: string, options?: Partial<DecimalColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.options = {
      nullable: false,
      default: undefined,
      unsigned: false,
      zeroFill: false,
      precision: 10,
      scale: 2,
      index: false,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.number({ optional: true }),
        unsigned: Validators.boolean(),
        zeroFill: Validators.boolean(),
        precision: Validators.integer(),
        scale: Validators.integer(),
        index: Validators.boolean()
      }
    );
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    // type
    let columnDefinition = `${this.name} DECIMAL(${this.options.precision}, ${this.options.scale})`;
    
    // nullable
    this.options.nullable
      ? columnDefinition += " NULL"
      : columnDefinition += " NOT NULL";
    
    // default
    if (this.options.default !== undefined) columnDefinition += ` DEFAULT ${this.options.default}`;
    
    // unsigned
    if (this.options.unsigned) columnDefinition += " UNSIGNED";
    
    // zeroFill
    if (this.options.zeroFill) columnDefinition += " ZEROFILL";
    
    // index
    if (this.options.index) columnDefinition += " INDEX";
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinition});`);
    }
    // Add column to existing table
    else
    {
      await connection.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnDefinition};`);
    }
  }
}