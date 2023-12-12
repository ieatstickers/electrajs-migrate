import { StringColumnTypeEnum } from "./StringColumnTypeEnum";
export type StringColumnOptions = {
    type: StringColumnTypeEnum;
    nullable: boolean;
    primaryKey: boolean;
    default: string;
    length: number;
    index: boolean;
    addAfter: string;
};
