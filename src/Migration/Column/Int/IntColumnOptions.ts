
export type IntColumnOptions = {
  nullable?: boolean;
  primaryKey?: boolean;
  default?: number,
  dropDefault?: boolean,
  unsigned?: boolean,
  autoIncrement?: boolean,
  zeroFill?: boolean,
  index?: boolean,
  dropIndex?: boolean,
  after?: string
};
