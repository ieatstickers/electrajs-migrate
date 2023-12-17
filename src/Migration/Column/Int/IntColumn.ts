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
      addAfter: undefined,
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
    let columnDefinition = `${escapedColumnName} ${this.options.type}`;
    
    // nullable
    columnDefinition = this.addNullableStatement(columnDefinition, this.options.nullable);
    
    // default
    columnDefinition = this.addDefaultStatement(columnDefinition, this.options.default);
    
    // unsigned
    columnDefinition = this.addUnsignedStatement(columnDefinition, this.options.unsigned);
    
    // autoIncrement
    columnDefinition = this.addAutoIncrementStatement(columnDefinition, this.options.autoIncrement);
    
    // zeroFill
    columnDefinition = this.addZeroFillStatement(columnDefinition, this.options.zeroFill);
    
    // primaryKey
    columnDefinition = this.addPrimaryKeyStatement(columnDefinition, this.options.primaryKey);
    
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
