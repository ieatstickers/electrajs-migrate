import { IntColumnTypeEnum } from "./IntColumnTypeEnum";
import { IntColumnOptions } from "./IntColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { Connection } from "../../Database/Connection";

export class IntColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: IntColumnOptions;
  
  public constructor(name: string, options?: Partial<IntColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.options = {
      type: IntColumnTypeEnum.INT,
      nullable: false,
      default: undefined,
      unsigned: false,
      autoIncrement: false,
      zeroFill: false,
      primaryKey: false,
      index: false,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        type: Validators.enumValue(IntColumnTypeEnum),
        nullable: Validators.boolean(),
        default: Validators.integer({ optional: true }),
        unsigned: Validators.boolean(),
        autoIncrement: Validators.boolean(),
        zeroFill: Validators.boolean(),
        primaryKey: Validators.boolean(),
        index: Validators.boolean()
      }
    );
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    // type
    let columnDefinition = `${this.name} ${this.options.type}`;
    
    // nullable
    this.options.nullable
      ? columnDefinition += " NULL"
      : columnDefinition += " NOT NULL";
    
    // default
    if (this.options.default !== undefined) columnDefinition += ` DEFAULT ${this.options.default}`;
    
    // unsigned
    if (this.options.unsigned) columnDefinition += " UNSIGNED";
    
    // autoIncrement
    if (this.options.autoIncrement) columnDefinition += " AUTO_INCREMENT";
    
    // zeroFill
    if (this.options.zeroFill) columnDefinition += " ZEROFILL";
    
    // primaryKey
    if (this.options.primaryKey) columnDefinition += " PRIMARY KEY";
    
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
