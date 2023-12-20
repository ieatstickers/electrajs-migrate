import { ModificationInterface } from "../ModificationInterface";
export declare class DropColumnModification implements ModificationInterface {
    private readonly name;
    constructor(name: string);
    getModificationDefinition(): string;
}
