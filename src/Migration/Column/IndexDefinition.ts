import { IndexDefinitionType } from "./IndexDefinitionType";

export class IndexDefinition
{
  private indexName: string;
  private indexColumns: Array<string> = [];
  private indexType: IndexDefinitionType = IndexDefinitionType.INDEX;
  
  public static create(): IndexDefinition
  {
    return new IndexDefinition();
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
    let indexDefinition = this.indexName && this.indexType === IndexDefinitionType.UNIQUE ? `${this.indexType} INDEX` : this.indexType;
    if (this.indexName) indexDefinition += ` \`${this.indexName}\``;
    indexDefinition += ` (${this.indexColumns.map(column => `\`${column}\``).join(", ")})`;
    return indexDefinition;
  }
}
