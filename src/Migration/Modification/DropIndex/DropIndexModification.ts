import { ModificationInterface } from "../ModificationInterface";

export class DropIndexModification implements ModificationInterface
{
  private readonly name: string;
  
  public constructor(name: string)
  {
    this.name = name;
  }
  
  public getModificationDefinition(): string
  {
    return `DROP INDEX \`${this.name}\``;
  }
}
