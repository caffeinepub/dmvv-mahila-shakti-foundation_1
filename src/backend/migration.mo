import Map "mo:core/Map";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";
import Storage "blob-storage/Storage";

module {
  type FolderId = Text;
  type FileId = Text;

  type FileReference = {
    id : FileId;
    name : Text;
    blob : Storage.ExternalBlob;
    size : Nat;
    timestamp : Int;
    tags : [Text];
    folderId : FolderId;
    description : Text;
    createdBy : Principal;
    createdAt : Int;
    isDeleted : Bool;
  };

  type FolderReference = {
    id : FolderId;
    name : Text;
    description : Text;
    parentFolderId : ?FolderId;
    files : [FileId];
    createdBy : Principal;
    createdAt : Int;
    isDeleted : Bool;
  };

  type OldActor = {};
  type NewActor = {
    filesMap : Map.Map<Text, FileReference>;
    folders : Map.Map<Text, FolderReference>;
    deletedFiles : Map.Map<Text, FileReference>;
    recentlyDeletedFiles : Map.Map<Text, FileReference>;
    maxFileSize : Nat;
    accessControlState : AccessControl.AccessControlState;
    approvalState : UserApproval.UserApprovalState;
    contentMap : Map.Map<Text, Text>;
  };

  public func run(_old : OldActor) : NewActor {
    {
      filesMap = Map.empty();
      folders = Map.empty();
      deletedFiles = Map.empty();
      recentlyDeletedFiles = Map.empty();
      maxFileSize = 1000000000;
      accessControlState = AccessControl.initState();
      approvalState = UserApproval.initState(AccessControl.initState());
      contentMap = Map.empty();
    };
  };
};
