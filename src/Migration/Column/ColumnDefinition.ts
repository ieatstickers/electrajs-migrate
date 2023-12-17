
export class ColumnDefinition
{
  private definition: string = "";
  
  public constructor(name: string, type: string)
  {
    this.definition = `\`${name}\` ${type}`;
  }
  
  public static create(name: string, type: string): ColumnDefinition
  {
    return new ColumnDefinition(name, type);
  }
  
  public nullable(nullable: boolean): this
  {
    this.definition += nullable ? " NULL" : " NOT NULL";
    return this;
  }
  
  public default(value: string | number): this
  {
    if (value !== undefined) this.definition += ` DEFAULT ${value}`;
    return this;
  }
  
  public unsigned(unsigned: boolean): this
  {
    if (unsigned) this.definition += " UNSIGNED";
    return this;
  }
  
  public autoIncrement(autoIncrement: boolean): this
  {
    if (autoIncrement) this.definition += " AUTO_INCREMENT";
    return this;
  }
  
  public zeroFill(zerofill: boolean): this
  {
    if (zerofill) this.definition += " ZEROFILL";
    return this;
  }
  
  public primaryKey(primaryKey: boolean): this
  {
    if (primaryKey) this.definition += " PRIMARY KEY";
    return this;
  }
  
  public after(after: string): this
  {
    if (after) this.definition += ` AFTER \`${after}\``;
    return this;
  }
  
  public get(): string
  {
    return this.definition;
  }
  
}
