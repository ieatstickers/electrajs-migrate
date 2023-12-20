import { IntColumnTypeEnum } from "./IntColumnTypeEnum";
import { IntColumnOptions } from "./IntColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { IndexDefinition } from "../../Definition/IndexDefinition";
import { ColumnDefinition } from "../../Definition/ColumnDefinition";

export class IntColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: IntColumnOptions;
  
  public constructor(name: string, options?: Partial<IntColumnOptions>)
  {
    super(name);
    
    this.options = {
      type: IntColumnTypeEnum.INT,
      nullable: false,
      default: undefined,
      unsigned: false,
      autoIncrement: false,
      zeroFill: false,
      primaryKey: false,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        type: Validators.enumValue(IntColumnTypeEnum),
        nullable: Validators.boolean(),
        default: Validators.integer({ optional: true }),
        unsigned: Validators.boolean(),
        autoIncrement: Validators.boolean(),
        zeroFill: Validators.boolean(),
        primaryKey: Validators.boolean(),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, this.options.type)
      .nullable(this.options.nullable)
      .default(this.options.default)
      .unsigned(this.options.unsigned)
      .autoIncrement(this.options.autoIncrement)
      .zeroFill(this.options.zeroFill)
      .primaryKey(this.options.primaryKey)
      .after(this.options.addAfter);
  }
  
  public getIndexDefinition(): IndexDefinition
  {
    if (!this.options.index) return null;
    
    return IndexDefinition
      .create()
      .columns(this.name);
  }
}
