import { BlobColumnOptions } from "./BlobColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Validators } from "@electra/utility";
import { AbstractColumn } from "../AbstractColumn";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class BlobColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: BlobColumnOptions = {};
  protected readonly type: string = ColumnTypeEnum.BLOB;
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to BlobColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public after(columnName: string): this
  {
    const { valid, message } = this.validateColumnName(columnName);
    if (valid === false) throw new TypeError(`Invalid value passed to BlobColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    if (!this.columnDefinition)
    {
      this.columnDefinition = ColumnDefinition.create(this.name, this.type);
    }
    
    return this.columnDefinition
      .nullable(this.options.nullable)
      .after(this.options.after);
  }
}
