
export type DoubleColumnOptions = {
  nullable: boolean,
  default: number,
  zeroFill: boolean,
  precision: number, // total digits
  scale: number, // digits after decimal
  index: boolean,
  addAfter: string
};
