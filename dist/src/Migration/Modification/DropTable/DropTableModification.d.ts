import { ModificationInterface } from "../ModificationInterface";
export declare class DropTableModification implements ModificationInterface {
    private readonly name;
    constructor(name: string);
    getModificationDefinition(): string;
}
