import { DecimalColumnOptions } from "./DecimalColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class DecimalColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: DecimalColumnOptions = {};
  private readonly precision: number;
  private readonly scale: number;
  
  public constructor(name: string, precision: number = 8, scale: number = 2)
  {
    super(name);
    
    this.precision = precision;
    this.scale = scale;
    
    const validator = Validators.integer();
    
    const { valid: precisionValid, message: precisionMessage } = validator.validate(precision);
    
    if (precisionValid === false)
    {
      throw new TypeError(`Invalid precision value passed to DecimalColumn.constructor: ${precisionMessage}`);
    }
    
    const { valid: scaleValid, message: scaleMessage } = validator.validate(scale);
    
    if (scaleValid === false)
    {
      throw new TypeError(`Invalid scale value passed to DecimalColumn.constructor: ${scaleMessage}`);
    }
  }
  
  public nullable(nullable: boolean = true): DecimalColumn
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to DecimalColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: number): DecimalColumn
  {
    const { valid, message } = Validators.number().validate(value);
    if (valid === false) throw new TypeError(`Invalid value passed to DecimalColumn.default: ${message}`);
    this.options.default = value;
    return this;
  }
  
  public unsigned(unsigned: boolean = true): DecimalColumn
  {
    const { valid, message } = Validators.boolean().validate(unsigned);
    if (valid === false) throw new TypeError(`Invalid value passed to DecimalColumn.unsigned: ${message}`);
    this.options.unsigned = unsigned;
    return this;
  }
  
  public zeroFill(zeroFill: boolean = true): DecimalColumn
  {
    const { valid, message } = Validators.boolean().validate(zeroFill);
    if (valid === false) throw new TypeError(`Invalid value passed to DecimalColumn.zeroFill: ${message}`);
    this.options.zeroFill = zeroFill;
    return this;
  }
  
  public index(index: boolean = true): DecimalColumn
  {
    const { valid, message } = Validators.boolean().validate(index);
    if (valid === false) throw new TypeError(`Invalid value passed to DecimalColumn.index: ${message}`);
    this.options.index = index;
    return this;
  }
  
  public after(columnName: string): DecimalColumn
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to DecimalColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, `${ColumnTypeEnum.DECIMAL}(${this.precision}, ${this.scale})`)
      .nullable(this.options.nullable)
      .default(
        typeof this.options.default === "number"
          ? this.options.default.toFixed(this.scale)
          : undefined
      )
      .unsigned(this.options.unsigned)
      .zeroFill(this.options.zeroFill)
      .after(this.options.after);
  }
  
  public getIndexDefinition(): IndexDefinition
  {
    if (!this.options.index) return null;
    
    return IndexDefinition
      .create()
      .columns(this.name);
  }
}
