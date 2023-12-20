import { ModificationInterface } from "../ModificationInterface";

export class RenameColumnModification implements ModificationInterface
{
  private readonly currentName: string;
  private readonly newName: string;
  
  public constructor(currentName: string, newName: string)
  {
    this.currentName = currentName;
    this.newName = newName;
  }
  
  public getModificationDefinition(): string
  {
    return `RENAME COLUMN \`${this.currentName}\` TO \`${this.newName}\``;
  }
}
