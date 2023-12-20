import { ModificationInterface } from "../ModificationInterface";
export declare class SetDefaultModification implements ModificationInterface {
    private readonly name;
    private readonly defaultValue;
    constructor(name: string, defaultValue: string | number);
    getModificationDefinition(): string;
}
