import { ModificationInterface } from "../ModificationInterface";

export class DropTableModification implements ModificationInterface
{
  private readonly name: string;
  
  public constructor(name: string)
  {
    this.name = name;
  }
  
  public getModificationDefinition(): string
  {
    return `DROP TABLE \`${this.name}\``;
  }
}
