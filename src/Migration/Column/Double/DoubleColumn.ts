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
      precision: undefined,
      scale: undefined,
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
        precision: Validators.integer({ optional: true }),
        scale: Validators.integer({ optional: true }),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
    
    if (
      (this.options.precision != null || this.options.scale != null)
      && (this.options.precision == null || this.options.scale == null)
    )
    {
      throw new Error(`Precision and scale must be both defined or both undefined in column ${this.name}`);
    }
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    const type = this.options.precision != null && this.options.scale != null
      ? `DOUBLE(${this.options.precision}, ${this.options.scale})`
      : "DOUBLE";
    return ColumnDefinition
      .create(this.name, type)
      .nullable(this.options.nullable)
      .default(
        typeof this.options.default === "number"
          ? this.options.default.toFixed(this.options.scale)
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
