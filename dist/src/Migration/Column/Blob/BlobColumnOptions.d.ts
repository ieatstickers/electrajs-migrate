import { BlobColumnTypeEnum } from "./BlobColumnTypeEnum";
export type BlobColumnOptions = {
    type: BlobColumnTypeEnum;
    nullable: boolean;
    addAfter: string;
};
