
export class ColumnDefinition
{
  private readonly name: string;
  private readonly type: string;
  private options: {
    nullable?: boolean;
    default?: string | number;
    unsigned?: boolean;
    autoIncrement?: boolean;
    zeroFill?: boolean;
    primaryKey?: boolean;
    after?: string;
  } = {
    nullable: undefined,
    default: undefined,
    unsigned: undefined,
    autoIncrement: undefined,
    zeroFill: undefined,
    primaryKey: undefined,
    after: undefined
  }
  
  public constructor(name: string, type: string)
  {
    this.name = name;
    this.type = type;
  }
  
  public static create(name: string, type: string): ColumnDefinition
  {
    return new ColumnDefinition(name, type);
  }
  
  public nullable(nullable: boolean): this
  {
    this.options.nullable = nullable;
    return this;
  }
  
  public default(value: string | number): this
  {
    this.options.default = value;
    return this;
  }
  
  public unsigned(unsigned: boolean): this
  {
    this.options.unsigned = unsigned;
    return this;
  }
  
  public autoIncrement(autoIncrement: boolean): this
  {
    this.options.autoIncrement = autoIncrement;
    return this;
  }
  
  public zeroFill(zerofill: boolean): this
  {
    this.options.zeroFill = zerofill;
    return this;
  }
  
  public primaryKey(primaryKey: boolean): this
  {
    this.options.primaryKey = primaryKey;
    return this;
  }
  
  public after(after: string): this
  {
    this.options.after = after;
    return this;
  }
  
  public get(): string
  {
    let definition = `\`${this.name}\` ${this.type}`;
    if (this.options.unsigned === true) definition += " UNSIGNED";
    definition += this.options.nullable === true ? " NULL" : " NOT NULL";
    if (this.options.default !== undefined) definition += ` DEFAULT ${this.options.default}`;
    if (this.options.autoIncrement === true) definition += " AUTO_INCREMENT";
    if (this.options.zeroFill === true) definition += " ZEROFILL";
    if (this.options.primaryKey === true) definition += " PRIMARY KEY";
    if (typeof this.options.after === "string") definition += ` AFTER \`${this.options.after}\``;
    return definition;
  }
  
}
