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
      addAfter: undefined,
      ...options
    };
    
    this.validateOptions(
      this.options,
      {
        type: Validators.enumValue(BlobColumnTypeEnum),
        nullable: Validators.boolean(),
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
    
    // nullable
    columnDefinition = this.addNullableStatement(columnDefinition, this.options.nullable);
    
    // after
    columnDefinition = this.addAfterStatement(
      columnDefinition,
      this.options.addAfter ? await connection.escape(this.options.addAfter) : undefined,
      !createTable
    );
    
    // Create new table
    if (createTable)
    {
      await connection.query(`CREATE TABLE ${escapedTableName} (${columnDefinition});`);
    }
    // Add column to existing table
    else
    {
      await connection.query(`ALTER TABLE ${escapedTableName} ADD COLUMN ${columnDefinition};`);
    }
  }
}
