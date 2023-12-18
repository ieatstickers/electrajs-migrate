import { EnumColumnOptions } from "./EnumColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";

export class EnumColumn extends AbstractColumn implements ColumnInterface
{
  private readonly values: Array<string>;
  private readonly options: EnumColumnOptions;
  
  public constructor(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>)
  {
    super(name);
    
    this.values = values;
    
    const { valid, message } = Validators
      .all([
        Validators.array(
          Validators.all([ Validators.string(), Validators.minLength(1) ])
        ),
        Validators.minLength(1)
      ])
      .validate(this.values);
    
    if (!valid) throw new TypeError(`Invalid ${this.constructor.name} values. ${message}`);
    
    this.options = {
      nullable: false,
      default: undefined,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    const valuesEnum = {};
    for (const value of this.values) valuesEnum[value] = value;
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.enumValue(valuesEnum, { optional: true }),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, `ENUM('${this.values.join("', '")}')`)
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
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
