import { BlobColumnTypeEnum } from "./BlobColumnTypeEnum";

export type BlobColumnOptions = {
  type: BlobColumnTypeEnum,
  nullable: boolean,
  addBefore: string,
  addAfter: string
};
