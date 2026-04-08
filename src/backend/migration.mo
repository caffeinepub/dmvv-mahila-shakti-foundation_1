import Map "mo:core/Map";

// ==================== MIGRATION ====================
// Drop all vendored-package state (authorization, object-storage, user-approval)
// and preserve only the core content map.
//
// Old types are defined inline (copied from .old/src/backend/dist/backend.most)
// to avoid importing from .old/ paths which are not resolvable at compile time.

module {

  // --- Raw internal B-tree Map representation (matches mo:core/Map internals) ---
  type Node<K, V> = { #internal : Internal<K, V>; #leaf : Leaf<K, V> };
  type Internal<K, V> = { children : [var ?Node<K, V>]; data : Data<K, V> };
  type Leaf<K, V> = { data : Data<K, V> };
  type Data<K, V> = { var count : Nat; kvs : [var ?(K, V)] };
  type RawMap<K, V> = { var root : Node<K, V>; var size : Nat };

  // --- Old stable-field types (exact shapes from .old dist/backend.most) ---
  type ExternalBlob    = Blob;
  type FileId          = Text;
  type FolderId        = Text;
  type UserRole        = { #admin; #guest; #user };
  type ApprovalStatus  = { #approved; #pending; #rejected };

  type FileReference = {
    blob        : ExternalBlob;
    createdAt   : Int;
    createdBy   : Principal;
    description : Text;
    folderId    : FolderId;
    id          : FileId;
    isDeleted   : Bool;
    name        : Text;
    size        : Nat;
    tags        : [Text];
    timestamp   : Int;
  };

  type FolderReference = {
    createdAt      : Int;
    createdBy      : Principal;
    description    : Text;
    files          : [FileId];
    id             : FolderId;
    isDeleted      : Bool;
    name           : Text;
    parentFolderId : ?FolderId;
  };

  public type OldActor = {
    accessControlState   : { var adminAssigned : Bool; userRoles : RawMap<Principal, UserRole> };
    approvalState        : { var approvalStatus : RawMap<Principal, ApprovalStatus> };
    contentMap           : RawMap<Text, Text>;
    deletedFiles         : RawMap<Text, FileReference>;
    filesMap             : RawMap<Text, FileReference>;
    folders              : RawMap<Text, FolderReference>;
    maxFileSize          : Nat;
    recentlyDeletedFiles : RawMap<Text, FileReference>;
  };

  public type NewActor = {
    contentMap : Map.Map<Text, Text>;
  };

  // On upgrade: preserve contentMap data, drop all vendored state.
  public func run(old : OldActor) : NewActor {
    { contentMap = old.contentMap };
  };

};
