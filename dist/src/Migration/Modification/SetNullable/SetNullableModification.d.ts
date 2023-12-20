import { ModificationInterface } from "../ModificationInterface";
export declare class SetNullableModification implements ModificationInterface {
    private readonly name;
    private readonly nullable;
    constructor(name: string, nullable: boolean);
    getModificationDefinition(): string;
}
