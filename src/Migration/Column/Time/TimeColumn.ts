import { TimeColumnOptions } from "./TimeColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../ColumnDefinition";

export class TimeColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: TimeColumnOptions;
  
  public constructor(name: string, options?: Partial<TimeColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    
    this.options = {
      nullable: false,
      default: undefined,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        nullable: Validators.boolean(),
        default: Validators.regex(
          /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
          'HH:MM:SS',
          { optional: true }
        ),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    return ColumnDefinition
      .create(this.name, "TIME")
      .nullable(this.options.nullable)
      .default(this.options.default ? `'${this.options.default}'` : undefined)
      .after(this.options.addAfter);
  }
}
