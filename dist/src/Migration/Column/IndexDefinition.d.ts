import { IndexDefinitionType } from "./IndexDefinitionType";
export declare class IndexDefinition {
    private indexName;
    private indexColumns;
    private indexType;
    static create(): IndexDefinition;
    name(name: string): this;
    columns(...columns: Array<string>): this;
    type(type: IndexDefinitionType): this;
    get(): string;
}
