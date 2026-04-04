import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type FolderId = string;
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface FolderReference {
    id: FolderId;
    files: Array<FileId>;
    isDeleted: boolean;
    name: string;
    createdAt: bigint;
    createdBy: Principal;
    description: string;
    parentFolderId?: FolderId;
}
export type FileId = string;
export interface FileReference {
    id: FileId;
    isDeleted: boolean;
    blob: ExternalBlob;
    name: string;
    createdAt: bigint;
    createdBy: Principal;
    size: bigint;
    tags: Array<string>;
    description: string;
    timestamp: bigint;
    folderId: FolderId;
}
export interface SimpleFileInfo {
    id: FileId;
    blob: ExternalBlob;
    name: string;
    size: bigint;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFolder(folderId: string, name: string, parentId: FolderId | null, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteFile(fileId: string): Promise<void>;
    deleteFolderInternal(folderId: string): Promise<void>;
    getAllDeletedFiles(): Promise<Array<FileReference>>;
    getAllFiles(): Promise<Array<FileReference>>;
    getAllFilesInFolders(): Promise<Array<FileReference>>;
    getAllFolders(): Promise<Array<FolderReference>>;
    getCallerUserRole(): Promise<UserRole>;
    getFileById(fileId: FileId): Promise<FileReference | null>;
    getFilesByCaller(): Promise<Array<FileReference>>;
    getFilesByFolderId(folderId: string): Promise<Array<FileReference>>;
    getFolderById(folderId: FolderId): Promise<FolderReference | null>;
    getSimpleFileInfoById(fileId: FileId): Promise<SimpleFileInfo | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    moveFileToFolderByReference(fileId: FileId, newFolderId: FolderId): Promise<void>;
    moveFileToFolderInternal(fileId: string, newFolderId: string): Promise<void>;
    moveFileToRoot(fileId: FileId): Promise<void>;
    moveFolderInternal(folderId: string, targetParentId: FolderId): Promise<void>;
    renameFolder(folderId: string, newName: string): Promise<void>;
    requestApproval(): Promise<void>;
    restoreFile(fileId: string): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setMaxFileSize(newMaxFileSize: bigint): Promise<void>;
    // Content management - persistent server-side storage
    saveContent(key: string, jsonValue: string): Promise<void>;
    getContent(key: string): Promise<string | null>;
    getAllContent(): Promise<Array<[string, string]>>;
    deleteContent(key: string): Promise<void>;
}
