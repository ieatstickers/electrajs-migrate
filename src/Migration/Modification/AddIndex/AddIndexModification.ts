import { ModificationInterface } from "../ModificationInterface";
import { IndexDefinition } from "../../Definition/IndexDefinition";

export class AddIndexModification implements ModificationInterface
{
  private definition: IndexDefinition;
  
  public constructor(definition: IndexDefinition)
  {
    this.definition = definition;
  }
  
  public getModificationDefinition(): string
  {
    return `ADD ${this.definition.get()}`;
  }
}
