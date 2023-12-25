import { IndexDefinitionTypeEnum } from "./Enum/IndexDefinitionTypeEnum";

export class IndexDefinition
{
  private indexName: string;
  private defaultIndexName: string;
  private indexColumns: Array<string> = [];
  private indexType: IndexDefinitionTypeEnum = IndexDefinitionTypeEnum.INDEX
  private dropIndex: boolean = false;
  
  public static create(): IndexDefinition
  {
    return new IndexDefinition();
  }
  
  public isDrop(): boolean
  {
    return this.dropIndex;
  }
  
  public drop(drop: boolean = true): this
  {
    this.dropIndex = drop;
    return this;
  }
  
  public defaultName(name: string): this
  {
    this.defaultIndexName = name;
    return this;
  }
  
  public name(name: string): this
  {
    this.indexName = name;
    return this;
  }
  
  public columns(...columns: Array<string>): this
  {
    this.indexColumns.push(...columns);
    return this;
  }
  
  public type(type: IndexDefinitionTypeEnum): this
  {
    this.indexType = type;
    return this;
  }
  
  public get(): string
  {
    if (!this.isDrop() && !this.indexColumns.length) throw new Error("No columns defined for index");
    const indexName = this.indexName || this.defaultIndexName;
    if (!indexName && this.isDrop()) throw new Error("No index name defined for drop index");
    let indexDefinition = indexName && this.indexType === IndexDefinitionTypeEnum.UNIQUE ? `${this.indexType} INDEX` : this.indexType;
    if (indexName) indexDefinition += ` \`${indexName}\``;
    if (!this.isDrop()) indexDefinition += ` (${this.indexColumns.map(column => `\`${column}\``).join(", ")})`;
    return indexDefinition;
  }
}
