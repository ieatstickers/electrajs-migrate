import { ColumnInterface } from "../ColumnInterface";
import { ColumnTypeEnum } from "../ColumnTypeEnum";
import { BlobColumn } from "./BlobColumn";

export class MediumBlobColumn extends BlobColumn implements ColumnInterface
{
  protected readonly type: string = ColumnTypeEnum.MEDIUMBLOB;
}
