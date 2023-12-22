import { ColumnInterface } from "../ColumnInterface";
import { ColumnTypeEnum } from "../ColumnTypeEnum";
import { BlobColumn } from "./BlobColumn";

export class LongBlobColumn extends BlobColumn implements ColumnInterface
{
  protected readonly type: string = ColumnTypeEnum.LONGBLOB;
}
