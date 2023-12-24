import { EnumColumnOptions } from "./EnumColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class EnumColumn extends AbstractColumn implements ColumnInterface
{
  private readonly values: Array<string>;
  private readonly options: EnumColumnOptions = {};
  
  public constructor(name: string, values: Array<string>)
  {
    super(name);
    
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
  }
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to EnumColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: string): this
  {
    const { valid, message } = Validators.string().validate(value);
    const valuesEnum = {};
    for (const value of this.values) valuesEnum[value] = value;
    const { valid: enumValueValid, message: enumValueMessage } = Validators.enumValue(valuesEnum).validate(value);
    if (valid === false || enumValueValid === false) throw new TypeError(`Invalid value passed to EnumColumn.default: ${message || enumValueMessage}`);
    this.options.default = value;
    return this;
  }
  
  public index(): this
  {
    this.options.index = true;
    return this;
  }
  
  public dropIndex(): this
  {
    this.options.dropIndex = true;
    return this;
  }
  
  public after(columnName: string): this
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to EnumColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, `${ColumnTypeEnum.ENUM}('${this.values.join("', '")}')`)
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
      .after(this.options.after);
  }
  
  public getIndexDefinition(): IndexDefinition
  {
    if (
      // No index and column doesn't exist yet
      (!this.options.index && !this.exists())
      // Not adding or dropping an index
      || (!this.options.index && !this.options.dropIndex)
    )
    {
      return null;
    }
    
    return IndexDefinition
      .create()
      .columns(this.name)
      .drop(this.options.dropIndex === true);
  }
}
