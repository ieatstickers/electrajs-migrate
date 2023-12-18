import { Schema, Validators } from "@electra/utility";
import { ColumnInterface } from "./ColumnInterface";
import { Connection } from "../Database/Connection";
import { Log } from "../../Utility/Log/Log";
import { ColumnDefinition } from "./ColumnDefinition";
import { IndexDefinition } from "./IndexDefinition";

export abstract class AbstractColumn implements ColumnInterface
{
  abstract getColumnDefinition(): ColumnDefinition;
  
  public getIndexDefinition(): IndexDefinition
  {
    return null;
  }
  
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
  
  protected addNullableStatement(query: string, nullable: boolean): string
  {
    return nullable ? `${query} NULL` : `${query} NOT NULL`;
  }
  
  protected addDefaultStatement(query: string, defaultValue: any): string
  {
    return defaultValue !== undefined ? `${query} DEFAULT ${defaultValue}` : query;
  }
  
  protected addIndexStatement(query: string, index: boolean, columnName: string): string
  {
    return index ? `${query}, ADD INDEX (${columnName})` : query;
  }
  
  protected addUnsignedStatement(query: string, unsigned: boolean): string
  {
    return unsigned ? `${query} UNSIGNED` : query;
  }
  
  protected addZeroFillStatement(query: string, zeroFill: boolean): string
  {
    return zeroFill ? `${query} ZEROFILL` : query;
  }
  
  protected addAutoIncrementStatement(query: string, autoIncrement: boolean): string
  {
    return autoIncrement ? `${query} AUTO_INCREMENT` : query;
  }
  
  protected addPrimaryKeyStatement(query: string, primaryKey: boolean): string
  {
    return primaryKey ? `${query} PRIMARY KEY` : query;
  }
  
  protected addAfterStatement(query: string, addAfter: string, tableExists: boolean): string
  {
    // Log warning if createTable is true and addAfter is set
    if (!tableExists && addAfter)
    {
      Log.yellow("WARNING: addAfter option is ignored when creating a new table.");
    }
    
    if (!tableExists) return query;
    
    if (addAfter)
    {
      query += ` AFTER ${addAfter}`;
    }
    
    return query;
  }
}
