import { IntColumnOptions } from "../Column/Int/IntColumnOptions";
import { DecimalColumnOptions } from "../Column/Decimal/DecimalColumnOptions";
import { StringColumnOptions } from "../Column/String/StringColumnOptions";
import { DateColumnOptions } from "../Column/Date/DateColumnOptions";
import { TimeColumnOptions } from "../Column/Time/TimeColumnOptions";
import { DateTimeColumnOptions } from "../Column/DateTime/DateTimeColumnOptions";
import { BlobColumnOptions } from "../Column/Blob/BlobColumnOptions";
import { EnumColumnOptions } from "../Column/Enum/EnumColumnOptions";
import { Connection } from "./Connection";
export declare class Table {
    private readonly name;
    private readonly connection;
    private readonly operations;
    private tableExists;
    constructor(name: string, connection: Connection, operations: Array<() => Promise<void>>, tableExists: boolean);
    id(name?: string): this;
    int(name: string, options?: Partial<IntColumnOptions>): this;
    decimal(name: string, options?: Partial<DecimalColumnOptions>): this;
    string(name: string, options?: Partial<StringColumnOptions>): this;
    enum(name: string, values: Array<string>, options?: Partial<EnumColumnOptions>): this;
    date(name: string, options?: Partial<DateColumnOptions>): this;
    time(name: string, options?: Partial<TimeColumnOptions>): this;
    datetime(name: string, options?: Partial<DateTimeColumnOptions>): this;
    blob(name: string, options?: Partial<BlobColumnOptions>): this;
    execute(): Promise<void>;
}