import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    /**
     * / Delete the entry for a given key (no-op if the key does not exist).
     */
    deleteContent(key: string): Promise<void>;
    /**
     * / Return all key-value pairs currently stored.
     */
    getAllContent(): Promise<Array<[string, string]>>;
    /**
     * / Retrieve the value for a given key. Returns null if not found.
     */
    getContent(key: string): Promise<string | null>;
    /**
     * / Save or overwrite a value for the given key.
     */
    saveContent(key: string, jsonValue: string): Promise<void>;
}
