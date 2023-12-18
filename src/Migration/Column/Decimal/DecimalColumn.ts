import { DecimalColumnOptions } from "./DecimalColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";

export class DecimalColumn extends AbstractColumn implements ColumnInterface
{
  private readonly options: DecimalColumnOptions;
  
  public constructor(name: string, options?: Partial<DecimalColumnOptions>)
  {
    super(name);
    
    this.options = {
      nullable: false,
      default: undefined,
      unsigned: false,
      zeroFill: false,
      precision: 10,
      scale: 2,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.number({ optional: true }),
        unsigned: Validators.boolean(),
        zeroFill: Validators.boolean(),
        precision: Validators.integer(),
        scale: Validators.integer(),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, `DECIMAL(${this.options.precision}, ${this.options.scale})`)
      .nullable(this.options.nullable)
      .default(
        typeof this.options.default === "number"
          ? this.options.default.toFixed(this.options.scale)
          : undefined
      )
      .unsigned(this.options.unsigned)
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
