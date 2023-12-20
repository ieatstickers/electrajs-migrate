import { IndexDefinitionTypeEnum } from "./Enum/IndexDefinitionTypeEnum";
export declare class IndexDefinition {
    private indexName;
    private defaultIndexName;
    private indexColumns;
    private indexType;
    static create(): IndexDefinition;
    defaultName(name: string): this;
    name(name: string): this;
    columns(...columns: Array<string>): this;
    type(type: IndexDefinitionTypeEnum): this;
    get(): string;
}
