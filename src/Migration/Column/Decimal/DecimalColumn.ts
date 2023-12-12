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
      addAfter: undefined,
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
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    const escapedColumnName = await connection.escape(this.name);
    const escapedTableName = await connection.escape(tableName);
    
    // type
    let columnDefinition = `${escapedColumnName} DECIMAL(${this.options.precision}, ${this.options.scale})`;
    
    // nullable
    columnDefinition = this.addNullableStatement(columnDefinition, this.options.nullable);
    
    // default
    columnDefinition = this.addDefaultStatement(
      columnDefinition,
      typeof this.options.default === "number" ? this.options.default.toFixed(this.options.scale) : undefined
    );
    
    // unsigned
    columnDefinition = this.addUnsignedStatement(columnDefinition, this.options.unsigned);
    
    // zeroFill
    columnDefinition = this.addZeroFillStatement(columnDefinition, this.options.zeroFill);
    
    // index
    columnDefinition = this.addIndexStatement(columnDefinition, this.options.index);
    
    // after
    columnDefinition = this.addAfterStatement(
      columnDefinition,
      this.options.addAfter ? await connection.escape(this.options.addAfter) : undefined,
      !createTable
    );
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE ${escapedTableName} (${columnDefinition});`);
    }
    // Add column to existing table
    else
    {
      await connection.query(`ALTER TABLE ${escapedTableName} ADD COLUMN ${columnDefinition};`);
    }
  }
}
