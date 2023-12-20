import { ModificationInterface } from "../ModificationInterface";

export class SetDefaultModification implements ModificationInterface
{
  private readonly name: string;
  private readonly defaultValue: string | number;
  
  public constructor(name: string, defaultValue: string | number)
  {
    this.name = name;
    this.defaultValue = defaultValue;
  }
  
  public getModificationDefinition(): string
  {
    let defaultValue = this.defaultValue;
    if (typeof defaultValue === "string") defaultValue = `'${defaultValue}'`;
    else if (defaultValue == null) defaultValue = "NULL";
    return `MODIFY COLUMN \`${this.name}\` DEFAULT ${defaultValue}`;
  }
}
