
export type DecimalColumnOptions = {
  nullable: boolean,
  default: number,
  unsigned: boolean,
  zeroFill: boolean,
  precision: number, // total digits
  scale: number, // digits after decimal
  index: boolean;
};
