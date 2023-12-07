import { EnumColumnOptions } from "./EnumColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Connection } from "../../Database/Connection";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";

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
        Validators.array(Validators.string()),
        Validators.minLength(1)
      ])
      .validate(this.values);
    
    if (!valid) throw new TypeError(`Invalid ${this.constructor.name} values. ${message}`);
    
    this.options = {
      nullable: false,
      default: undefined,
      index: false,
      addBefore: undefined,
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
        addBefore: Validators.string({ optional: true }),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    const escapedColumnName = await connection.escape(this.name);
    const escapedTableName = await connection.escape(tableName);
    const escapedValues = await Promise.all(this.values.map(value => connection.escape(value)));
    
    let columnDefinition = `${escapedColumnName} ENUM('${escapedValues.join("', '")}')`;
    
    // addBefore
    if (this.options.addBefore)
    {
      columnDefinition += ` BEFORE ${await connection.escape(this.options.addBefore)}`;
    }
    // addAfter
    else if (this.options.addAfter)
    {
      columnDefinition += ` AFTER ${await connection.escape(this.options.addAfter)}`;
    }
    
    // nullable
    this.options.nullable
      ? columnDefinition += " NULL"
      : columnDefinition += " NOT NULL";
    
    // default
    if (this.options.default !== undefined) columnDefinition += ` DEFAULT '${await connection.escape(this.options.default)}'`;
    
    // index
    if (this.options.index) columnDefinition += " INDEX";
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE ${escapedTableName} (${columnDefinition})`);
    }
    // Alter existing table
    else
    {
      await connection.query(`ALTER TABLE ${escapedTableName} ADD COLUMN ${columnDefinition}`);
    }
  }
}
