import { EnumColumnOptions } from "./EnumColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Connection } from "../../Database/Connection";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../ColumnDefinition";

export class EnumColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly values: Array<string>;
  private readonly options: EnumColumnOptions;
  
  public constructor(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.values = values;
    
    const { valid, message } = Validators
      .all([
        Validators.array(
          Validators.all([ Validators.string(), Validators.minLength(1) ])
        ),
        Validators.minLength(1)
      ])
      .validate(this.values);
    
    if (!valid) throw new TypeError(`Invalid ${this.constructor.name} values. ${message}`);
    
    this.options = {
      nullable: false,
      default: undefined,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    const valuesEnum = {};
    for (const value of this.values) valuesEnum[value] = value;
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.enumValue(valuesEnum, { optional: true }),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public async getDefinition(): Promise<string>
  {
    return ColumnDefinition
      .create(this.name, `ENUM('${this.values.join("', '")}')`)
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
      .after(this.options.addAfter)
      .get();
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    const escapedColumnName = await connection.escape(this.name);
    const escapedTableName = await connection.escape(tableName);
    
    let columnDefinition = `${escapedColumnName} ENUM('${this.values.join("', '")}')`;
    
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
