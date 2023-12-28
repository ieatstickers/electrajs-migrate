import { IntColumnOptions } from "./IntColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";
import { ColumnTypeEnum } from "../ColumnTypeEnum";

export class IntColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: IntColumnOptions = {};
  protected readonly type: string = ColumnTypeEnum.INT
  
  public nullable(nullable: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(nullable);
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.nullable: ${message}`);
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: number): this
  {
    const { valid, message } = Validators.integer().validate(value);
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.default: ${message}`);
    this.options.default = value;
    return this;
  }
  
  public dropDefault(): this
  {
    this.options.dropDefault = true;
    return this;
  }
  
  public unsigned(unsigned: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(unsigned);
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.unsigned: ${message}`);
    this.options.unsigned = unsigned;
    return this;
  }
  
  public autoIncrement(autoIncrement: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(autoIncrement);
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.autoIncrement: ${message}`);
    this.options.autoIncrement = autoIncrement;
    return this;
  }
  
  public zeroFill(zeroFill: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(zeroFill);
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.zeroFill: ${message}`);
    this.options.zeroFill = zeroFill;
    return this;
  }
  
  public primaryKey(primaryKey: boolean = true): this
  {
    const { valid, message } = Validators.boolean().validate(primaryKey);
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.primaryKey: ${message}`);
    this.options.primaryKey = primaryKey;
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
    if (valid === false) throw new TypeError(`Invalid value passed to IntColumn.after: ${message}`);
    this.options.after = columnName;
    return this;
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, this.type)
      .nullable(this.options.nullable)
      .default(this.options.default)
      .dropDefault(this.options.dropDefault)
      .unsigned(this.options.unsigned)
      .autoIncrement(this.options.autoIncrement)
      .zeroFill(this.options.zeroFill)
      .primaryKey(this.options.primaryKey)
      .after(this.options.after);
  }
  
  public getIndexDefinition(): IndexDefinition
  {
    console.log('IntColumn.getIndexDefinition', this.name, {
      'this.options.index': this.options.index,
      'this.exists()': this.exists(),
      'this.options.dropIndex': this.options.dropIndex,
    })
    
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
