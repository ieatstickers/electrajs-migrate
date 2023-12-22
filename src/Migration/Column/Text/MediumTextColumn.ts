import { ColumnInterface } from "../ColumnInterface";
import { ColumnTypeEnum } from "../ColumnTypeEnum";
import { TextColumn } from "./TextColumn";

export class MediumTextColumn extends TextColumn implements ColumnInterface
{
  protected readonly type: string = ColumnTypeEnum.MEDIUMTEXT;
}
