import { StringColumnOptions } from "./StringColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class StringColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: StringColumnOptions = {};
  protected readonly type: string = ColumnTypeEnum.VARCHAR;
  private readonly length: number;
  
  public constructor(name: string, length: number = 255)
  {
    super(name);
    this.length = length;
    const { valid, message } = Validators.integer().validate(length);
    if (valid === false) throw new TypeError(`Invalid value passed to StringColumn.constructor: ${message}`);
  }
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to StringColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public primaryKey(primaryKey: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(primaryKey);
    if (valid === false) throw new TypeError(`Invalid value passed to StringColumn.primaryKey: ${message}`);
    this.options.primaryKey = primaryKey;
    return this;
  }
  
  public default(value: string): this
  {
    const { valid, message } = Validators.string().validate(value);
    if (valid === false) throw new TypeError(`Invalid value passed to StringColumn.default: ${message}`);
    this.options.default = value;
    return this;
  }
  
  public dropDefault(): this
  {
    this.options.dropDefault = true;
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
    if (valid === false) throw new TypeError(`Invalid value passed to StringColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    if(!this.columnDefinition)
    {
      this.columnDefinition = ColumnDefinition.create(this.name, `${this.type}(${this.length})`);
    }
    
    return this.columnDefinition
      .nullable(this.options.nullable)
      .primaryKey(this.options.primaryKey)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
      .dropDefault(this.options.dropDefault)
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
