import { ModificationInterface } from "../ModificationInterface";
export declare class DropIndexModification implements ModificationInterface {
    private readonly name;
    constructor(name: string);
    getModificationDefinition(): string;
}
