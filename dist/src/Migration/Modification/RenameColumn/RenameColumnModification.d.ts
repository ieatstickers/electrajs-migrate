import { ModificationInterface } from "../ModificationInterface";
export declare class RenameColumnModification implements ModificationInterface {
    private readonly currentName;
    private readonly newName;
    constructor(currentName: string, newName: string);
    getModificationDefinition(): string;
}
