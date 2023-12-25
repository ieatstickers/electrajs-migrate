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
    if (!this.indexColumns.length) throw new Error("No columns defined for index");
    const indexName = this.indexName || this.defaultIndexName;
    let indexDefinition = this.dropIndex
      ? 'DROP INDEX' // TODO: Shouldn't add the DROP part from within the IndexDefinition in the same way we don't add the ADD part
      : indexName && this.indexType === IndexDefinitionTypeEnum.UNIQUE ? `${this.indexType} INDEX` : this.indexType;
    if (indexName) indexDefinition += ` \`${indexName}\``;
    indexDefinition += ` (${this.indexColumns.map(column => `\`${column}\``).join(", ")})`;
    return indexDefinition;
  }
}
