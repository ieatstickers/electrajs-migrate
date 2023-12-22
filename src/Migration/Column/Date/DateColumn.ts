import { DateColumnOptions } from "./DateColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Validators } from "@electra/utility";
import { AbstractColumn } from "../AbstractColumn";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class DateColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: DateColumnOptions = {};
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to DateColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: string): this
  {
    const { valid, message } = Validators
      .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "YYYY-MM-DD")
      .validate(value);
    if (valid === false) throw new TypeError(`Invalid value passed to DateColumn.default: ${message}`);
    this.options.default = value;
    return this;
  }
  
  public index(index: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(index);
    if (valid === false) throw new TypeError(`Invalid value passed to DateColumn.index: ${message}`);
    this.options.index = index;
    return this;
  }
  
  public after(columnName: string): this
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to DateColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, ColumnTypeEnum.DATE)
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
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
