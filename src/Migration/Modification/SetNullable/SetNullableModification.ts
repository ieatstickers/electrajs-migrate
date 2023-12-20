import { ModificationInterface } from "../ModificationInterface";

export class SetNullableModification implements ModificationInterface
{
  private readonly name: string;
  private readonly nullable: boolean;
  
  public constructor(name: string, nullable: boolean)
  {
    this.name = name;
    this.nullable = nullable;
  }
  
  public getModificationDefinition(): string
  {
    return `MODIFY COLUMN \`${this.name}\` ${this.nullable ? "NULL" : "NOT NULL"}`;
  }
}
