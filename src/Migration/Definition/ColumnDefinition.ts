import { Connection } from "../Database/Connection";

type ColumnDefinitionOptions = {
  nullable?: boolean;
  default?: string | number;
  dropDefault?: boolean;
  unsigned?: boolean;
  autoIncrement?: boolean;
  zeroFill?: boolean;
  primaryKey?: boolean;
  after?: string;
};

export class ColumnDefinition
{
  private readonly name: string;
  private readonly type: string;
  private options: ColumnDefinitionOptions = {
    nullable: undefined,
    default: undefined,
    dropDefault: undefined,
    unsigned: undefined,
    autoIncrement: undefined,
    zeroFill: undefined,
    primaryKey: undefined,
    after: undefined
  };
  private existingType: string;
  private existingOptions: ColumnDefinitionOptions = {};
  
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
  
  public dropDefault(dropDefault: boolean): this
  {
    this.options.dropDefault = dropDefault;
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
    
    // Unsigned
    const unsigned = typeof this.options.unsigned === "boolean" ? this.options.unsigned : this.existingOptions.unsigned;
    if (unsigned === true) definition += " UNSIGNED";
    
    // Nullable
    const nullable = typeof this.options.nullable === "boolean" ? this.options.nullable : this.existingOptions.nullable;
    definition += nullable === true ? " NULL" : " NOT NULL";
    
    // Default
    if (this.options.dropDefault !== true)
    {
      const defaultValue = this.options.default !== undefined ? this.options.default : this.existingOptions.default;
      if (defaultValue === null) definition += " DEFAULT NULL";
      else if (defaultValue !== undefined) definition += ` DEFAULT ${defaultValue}`
    }
    
    // Auto increment
    const autoIncrement = typeof this.options.autoIncrement === "boolean" ? this.options.autoIncrement : this.existingOptions.autoIncrement;
    if (autoIncrement === true) definition += " AUTO_INCREMENT";
    
    // Zero fill
    const zeroFill = typeof this.options.zeroFill === "boolean" ? this.options.zeroFill : this.existingOptions.zeroFill;
    if (zeroFill === true) definition += " ZEROFILL";
    
    // Primary key
    const primaryKey = typeof this.options.primaryKey === "boolean" ? this.options.primaryKey : this.existingOptions.primaryKey;
    if (primaryKey === true) definition += " PRIMARY KEY";
    
    // After
    if (typeof this.options.after === "string") definition += ` AFTER \`${this.options.after}\``;
    return definition;
  }
  
  public async hydrateExistingOptions(connection: Connection, column: string, table: string): Promise<void>
  {
    const [ result ] = await connection.query(`
      SELECT
        *
      FROM
        INFORMATION_SCHEMA.COLUMNS
      WHERE
        TABLE_NAME = '${table}'
        AND COLUMN_NAME = '${column}';
    `);
    
    if (!result) throw new Error(`Column "${column}" does not exist in table "${table}"`);
    
    this.existingType = result.COLUMN_TYPE.split(" ").shift();
    this.existingOptions.nullable = result.IS_NULLABLE === "YES";
    this.existingOptions.default = result.COLUMN_DEFAULT === null && result.IS_NULLABLE === "NO" ? undefined : result.COLUMN_DEFAULT;
    this.existingOptions.dropDefault = false;
    this.existingOptions.unsigned = result.COLUMN_TYPE.includes("unsigned");
    this.existingOptions.autoIncrement = result.EXTRA.includes("auto_increment");
    this.existingOptions.zeroFill = result.COLUMN_TYPE.includes("zerofill");
    this.existingOptions.primaryKey = result.COLUMN_KEY === "PRI";
    
  }
  
}
