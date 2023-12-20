import { ModificationInterface } from "../ModificationInterface";

export class DropColumnModification implements ModificationInterface
{
  private readonly name: string;
  
  public constructor(name: string)
  {
    this.name = name;
  }
  
  public getModificationDefinition(): string
  {
    return `DROP COLUMN \`${this.name}\``;
  }
}
