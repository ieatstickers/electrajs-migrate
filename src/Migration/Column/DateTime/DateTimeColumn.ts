import { DateTimeColumnOptions } from "./DateTimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class DateTimeColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: DateTimeColumnOptions = {};
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to DateTimeColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: string): this
  {
    const { valid, message } = Validators
      .regex(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) ([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
        "YYYY-MM-DD HH:MM:SS"
      )
      .validate(value);
    if (valid === false) throw new TypeError(`Invalid value passed to DateTimeColumn.default: ${message}`);
    this.options.default = value;
    return this;
  }
  
  public index(index: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(index);
    if (valid === false) throw new TypeError(`Invalid value passed to DateTimeColumn.index: ${message}`);
    this.options.index = index;
    return this;
  }
  
  public after(columnName: string): this
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to DateTimeColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, ColumnTypeEnum.DATETIME)
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
