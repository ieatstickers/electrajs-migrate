import { Schema, Validators } from "@electra/utility";
import { ColumnInterface } from "./ColumnInterface";
import { Connection } from "../Database/Connection";

export abstract class AbstractColumn implements ColumnInterface
{
  abstract create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
  
  protected validateName(name: string): boolean
  {
    const { valid, message } = Validators
      .all([
        Validators.string(),
        Validators.minLength(1),
        Validators.regex(/^[a-zA-Z_][a-zA-Z0-9_]{0,63}$/, 'A-z, 0-9 and/or _')
      ])
      .validate(name);
    if (!valid) throw new TypeError(`Invalid ${this.constructor.name} name: ${message}`);
    return true;
  }
  
  protected validateOptions(options: { [key: string]: any }, schema: Schema): boolean
  {
    const { valid, message } = Validators.schema(schema).validate(options);
    
    if (!valid)
    {
      throw new TypeError(`Invalid ${this.constructor.name} options. ${message}`);
    }
    
    return true;
  }
}
