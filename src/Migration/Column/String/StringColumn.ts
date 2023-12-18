import { StringColumnTypeEnum } from "./StringColumnTypeEnum";
import { StringColumnOptions } from "./StringColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { AbstractColumn } from "../AbstractColumn";
import { Validators } from "@electra/utility";
import { ColumnDefinition } from "../ColumnDefinition";
import { IndexDefinition } from "../IndexDefinition";

export class StringColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: StringColumnOptions;
  
  public constructor(name: string, options?: Partial<StringColumnOptions>)
  {
    super();
    
    this.name = name;
    this.validateName(this.name);
    const type = options?.type || StringColumnTypeEnum.VARCHAR;
    
    this.options = {
      type: type,
      nullable: false,
      primaryKey: false,
      default: undefined,
      length: type !== StringColumnTypeEnum.VARCHAR ? undefined : 255,
      index: false,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        type: Validators.enumValue(StringColumnTypeEnum),
        nullable: Validators.boolean(),
        primaryKey: Validators.boolean(),
        default: Validators.string({ optional: true }),
        length: Validators.integer({ optional: true }),
        index: Validators.boolean(),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public getColumnDefinition(): ColumnDefinition
  {
    let columnType: string = this.options.type;
    
    if (this.options.type === StringColumnTypeEnum.CHAR || this.options.type === StringColumnTypeEnum.VARCHAR)
    {
      if (this.options.length !== undefined) columnType += `(${this.options.length})`;
    }
    
    return ColumnDefinition
      .create(this.name, columnType)
      .nullable(this.options.nullable)
      .primaryKey(this.options.primaryKey)
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
