export declare class Modules {
    static import(exportName: string, path: string): Promise<any>;
    static import(path: string): Promise<any>;
    static require(exportName: string, path: string): any;
    static require(path: string): any;
    static isCommonJS(): boolean;
}
