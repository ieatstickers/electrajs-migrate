import { Connection } from "../Database/Connection";
export declare class ColumnDefinition {
    private readonly name;
    private readonly type;
    private options;
    private existingType;
    private existingOptions;
    constructor(name: string, type: string);
    static create(name: string, type: string): ColumnDefinition;
    nullable(nullable: boolean): this;
    default(value: string | number): this;
    dropDefault(dropDefault: boolean): this;
    unsigned(unsigned: boolean): this;
    autoIncrement(autoIncrement: boolean): this;
    zeroFill(zerofill: boolean): this;
    primaryKey(primaryKey: boolean): this;
    after(after: string): this;
    get(): string;
    hydrateExistingOptions(connection: Connection, column: string, table: string): Promise<void>;
}
