import { ModificationInterface } from "../ModificationInterface";
import { IndexDefinition } from "../../Definition/IndexDefinition";
export declare class AddIndexModification implements ModificationInterface {
    private definition;
    constructor(definition: IndexDefinition);
    getModificationDefinition(): string;
}
