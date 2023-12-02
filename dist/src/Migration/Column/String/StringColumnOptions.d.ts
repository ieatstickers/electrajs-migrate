import { StringColumnTypeEnum } from "./StringColumnTypeEnum";
export type StringColumnOptions = {
    type: StringColumnTypeEnum;
    nullable: boolean;
    primaryKey: boolean;
    default: number;
    length: number;
    index: boolean;
};
