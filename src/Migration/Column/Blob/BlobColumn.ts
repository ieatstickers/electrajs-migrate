import { BlobColumnTypeEnum } from "./BlobColumnTypeEnum";
import { BlobColumnOptions } from "./BlobColumnOptions";
import { ColumnInterface } from "../ColumnInterface";
import { Validators } from "@electra/utility";
import { AbstractColumn } from "../AbstractColumn";
import { Connection } from "../../Database/Connection";

export class BlobColumn extends AbstractColumn implements ColumnInterface
{
  private readonly name: string;
  private readonly options: BlobColumnOptions;
  
  public constructor(name: string, options?: Partial<BlobColumnOptions>)
  {
    super();
    
    this.name = name;
    
    this.validateName(this.name);
    
    this.options = {
      type: BlobColumnTypeEnum.BLOB,
      nullable: false,
      addBefore: undefined,
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        type: Validators.enumValue(BlobColumnTypeEnum),
        nullable: Validators.boolean(),
        addBefore: Validators.string({ optional: true }),
        addAfter: Validators.string({ optional: true })
      }
    );
  }
  
  public async create(connection: Connection, tableName: string, createTable: boolean): Promise<void>
  {
    const escapedColumnName = await connection.escape(this.name);
    const escapedTableName = await connection.escape(tableName);
    
    // type
    let columnDefinition = `${escapedColumnName} ${this.options.type}`;
    
    // addBefore
    if (this.options.addBefore)
    {
      columnDefinition += ` BEFORE ${await connection.escape(this.options.addBefore)}`;
    }
    // addAfter
    else if (this.options.addAfter)
    {
      columnDefinition += ` AFTER ${await connection.escape(this.options.addAfter)}`;
    }
    
    // nullable
    this.options.nullable
      ? columnDefinition += " NULL"
      : columnDefinition += " NOT NULL";
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE IF NOT EXISTS ${escapedTableName}(${columnDefinition});`);
    }
    // Add column to existing table
    else
    {
      await connection.query(`ALTER TABLE ${escapedTableName} ADD COLUMN ${columnDefinition};`);
    }
  }
}
