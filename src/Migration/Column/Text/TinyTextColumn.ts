import { ColumnInterface } from "../ColumnInterface";
import { ColumnTypeEnum } from "../ColumnTypeEnum";
import { TextColumn } from "./TextColumn";

export class TinyTextColumn extends TextColumn implements ColumnInterface
{
  protected readonly type: string = ColumnTypeEnum.TINYTEXT;
}
