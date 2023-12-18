import { IndexDefinitionType } from "./IndexDefinitionType";

export class IndexDefinition
{
  private indexName: string;
  private defaultIndexName: string;
  private indexColumns: Array<string> = [];
  private indexType: IndexDefinitionType = IndexDefinitionType.INDEX;
  
  public static create(): IndexDefinition
  {
    return new IndexDefinition();
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
  
  public type(type: IndexDefinitionType): this
  {
    this.indexType = type;
    return this;
  }
  
  public get(): string
  {
    if (!this.indexColumns.length) throw new Error("No columns defined for index");
    const indexName = this.indexName || this.defaultIndexName;
    let indexDefinition = indexName && this.indexType === IndexDefinitionType.UNIQUE ? `${this.indexType} INDEX` : this.indexType;
    if (indexName) indexDefinition += ` \`${indexName}\``;
    indexDefinition += ` (${this.indexColumns.map(column => `\`${column}\``).join(", ")})`;
    return indexDefinition;
  }
}
