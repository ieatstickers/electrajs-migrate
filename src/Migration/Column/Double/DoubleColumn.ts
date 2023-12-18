import { DoubleColumnOptions } from "./DoubleColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";

export class DoubleColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: DoubleColumnOptions;
  
  public constructor(name: string, options?: Partial<DoubleColumnOptions>)
  {
    super(name);
    
    this.options = {
      nullable: false,
      default: undefined,
      zeroFill: false,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.number({ optional: true }),
        zeroFill: Validators.boolean(),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, "DOUBLE")
      .nullable(this.options.nullable)
      .default(
        typeof this.options.default === "number"
          ? this.options.default.toFixed(2)
          : undefined
      )
      .zeroFill(this.options.zeroFill)
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
