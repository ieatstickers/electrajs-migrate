import { IntColumnTypeEnum } from "./IntColumnTypeEnum";
export type IntColumnOptions = {
    type: IntColumnTypeEnum;
    nullable: boolean;
    primaryKey: boolean;
    default: number;
    unsigned: boolean;
    autoIncrement: boolean;
    zeroFill: boolean;
    index: boolean;
};
