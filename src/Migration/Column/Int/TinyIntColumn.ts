import { ColumnInterface } from "../ColumnInterface";
import { ColumnTypeEnum } from "../ColumnTypeEnum";
import { IntColumn } from "./IntColumn";

export class TinyIntColumn extends IntColumn implements ColumnInterface
{
  protected readonly type: string = ColumnTypeEnum.TINYINT;
}
