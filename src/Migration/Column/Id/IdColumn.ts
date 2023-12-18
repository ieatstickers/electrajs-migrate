import { IntColumnTypeEnum } from "../Int/IntColumnTypeEnum";
import { ColumnInterface } from "../ColumnInterface";
import { IntColumn } from "../Int/IntColumn";

export class IdColumn extends IntColumn implements ColumnInterface
{
  public constructor(name: string)
  {
    super(
      name,
      {
        type: IntColumnTypeEnum.INT,
        nullable: false,
        default: undefined,
        unsigned: true,
        autoIncrement: true,
        zeroFill: false,
        primaryKey: true,
        index: false
      }
    );
  }
}
