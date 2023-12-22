export type IntColumnOptions = {
    nullable?: boolean;
    primaryKey?: boolean;
    default?: number;
    unsigned?: boolean;
    autoIncrement?: boolean;
    zeroFill?: boolean;
    index?: boolean;
    after?: string;
};
