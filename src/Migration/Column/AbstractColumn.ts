import { Schema, Validators } from "@electra/utility";
import { ColumnInterface } from "./ColumnInterface";
import { Connection } from "../Database/Connection";

export abstract class AbstractColumn implements ColumnInterface
{
  abstract create(connection: Connection, tableName: string, createTable: boolean): Promise<void>;
  
  protected validateName(name: string): boolean
  {
    const { valid, message } = Validators.string().validate(name);
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
