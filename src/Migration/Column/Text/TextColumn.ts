import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";
import { TextColumnOptions } from "./TextColumnOptions";

export class TextColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: TextColumnOptions = {};
  protected readonly type: string = ColumnTypeEnum.TEXT;
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to TextColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public after(columnName: string): this
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to TextColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, this.type)
      .nullable(this.options.nullable)
      .after(this.options.after);
  }
}
