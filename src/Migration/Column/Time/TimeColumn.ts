import { TimeColumnOptions } from "./TimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class TimeColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: TimeColumnOptions = {};
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to TimeColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: string): this
  {
    const { valid, message } = Validators
      .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "HH:MM:SS", { optional: true })
      .validate(value);
    if (valid === false) throw new TypeError(`Invalid value passed to TimeColumn.default: ${message}`);
    this.options.default = value;
    return this;
  }
  
  public after(columnName: string): this
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to TimeColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, ColumnTypeEnum.TIME)
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
      .after(this.options.after);
  }
}
