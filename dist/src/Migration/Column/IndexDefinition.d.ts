import { IndexDefinitionType } from "./IndexDefinitionType";
export declare class IndexDefinition {
    private indexName;
    private defaultIndexName;
    private indexColumns;
    private indexType;
    static create(): IndexDefinition;
    defaultName(name: string): this;
    name(name: string): this;
    columns(...columns: Array<string>): this;
    type(type: IndexDefinitionType): this;
    get(): string;
}
