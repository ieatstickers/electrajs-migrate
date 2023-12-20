export interface DatabaseInterface {
    initialize(): Promise<void>;
    transaction(fn: (repositories: {
        [key: string]: any;
    }) => Promise<void>): Promise<void>;
    destroy(): Promise<void>;
}
