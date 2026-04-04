import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Storage "blob-storage/Storage";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";
import Migration "migration";

(with migration = Migration.run)
actor {
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

  type SimpleFileInfo = {
    id : FileId;
    name : Text;
    blob : Storage.ExternalBlob;
    size : Nat;
  };

  // ==================== CONTENT TYPES ====================

  type SiteSettings = {
    siteTitle : Text;
    tagline : Text;
    footerText : Text;
    contactEmail : Text;
    contactPhone : Text;
    address : Text;
    logoUrl : Text;
    signatureUrl : Text;
    sealUrl : Text;
    authorityName : Text;
    authorityDesignation : Text;
    socialFacebook : Text;
    socialTwitter : Text;
    socialInstagram : Text;
    socialYoutube : Text;
    heroTitle : Text;
    heroSubtitle : Text;
    heroImageUrl : Text;
    statsMembers : Text;
    statsDistricts : Text;
    statsPrograms : Text;
    statsYears : Text;
    ctaTitle : Text;
    ctaSubtitle : Text;
    copyright : Text;
  };

  type NewsItem = {
    id : Text;
    title : Text;
    content : Text;
    category : Text;
    publishDate : Text;
    isPublished : Bool;
    imageUrl : Text;
  };

  type GalleryItem = {
    id : Text;
    title : Text;
    imageUrl : Text;
    videoUrl : Text;
    category : Text;
    isVideo : Bool;
    caption : Text;
    sortOrder : Nat;
  };

  type TrainingProgram = {
    id : Text;
    title : Text;
    description : Text;
    duration : Text;
    eligibility : Text;
    benefits : Text;
    imageUrl : Text;
    cardColor : Text;
    isActive : Bool;
  };

  type CenterItem = {
    id : Text;
    name : Text;
    address : Text;
    state : Text;
    district : Text;
    block : Text;
    contactPhone : Text;
    isActive : Bool;
    imageUrl : Text;
    services : Text;
  };

  type SchemeItem = {
    id : Text;
    title : Text;
    description : Text;
    eligibility : Text;
    benefits : Text;
    imageUrl : Text;
    isFeatured : Bool;
    isActive : Bool;
  };

  type EmploymentItem = {
    id : Text;
    itemType : Text;
    title : Text;
    description : Text;
    imageUrl : Text;
    company : Text;
    position : Text;
  };

  type LoanType = {
    id : Text;
    name : Text;
    description : Text;
    amount : Text;
    interestRate : Text;
    tenure : Text;
    eligibility : Text;
    isActive : Bool;
  };

  type RewardItem = {
    id : Text;
    category : Text;
    title : Text;
    description : Text;
    imageUrl : Text;
    winnerName : Text;
    winnerPhoto : Text;
    year : Text;
  };

  type DownloadItem = {
    id : Text;
    title : Text;
    description : Text;
    fileUrl : Text;
    category : Text;
    sortOrder : Nat;
  };

  type LegalDocument = {
    id : Text;
    title : Text;
    description : Text;
    issuedBy : Text;
    issueDate : Text;
    expiryDate : Text;
    documentUrl : Text;
    isActive : Bool;
  };

  type WishItem = {
    id : Text;
    senderName : Text;
    designation : Text;
    organization : Text;
    message : Text;
    photoUrl : Text;
    date : Text;
    isActive : Bool;
  };

  type ImpactStory = {
    id : Text;
    title : Text;
    description : Text;
    personName : Text;
    personPhoto : Text;
    location : Text;
    year : Text;
  };

  type LeadershipMember = {
    id : Text;
    name : Text;
    designation : Text;
    qualification : Text;
    message : Text;
    photoUrl : Text;
    sortOrder : Nat;
    isActive : Bool;
  };

  type FoundationEvent = {
    id : Text;
    title : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
    isActive : Bool;
  };

  type ComputerCenter = {
    id : Text;
    name : Text;
    location : Text;
    state : Text;
    district : Text;
    facilities : Text;
    imageUrl : Text;
    isActive : Bool;
  };

  type CommunityCenterItem = {
    id : Text;
    name : Text;
    address : Text;
    services : Text;
    imageUrl : Text;
    contactPhone : Text;
    isActive : Bool;
  };

  type TransportItem = {
    id : Text;
    vehicleType : Text;
    route : Text;
    capacity : Text;
    contactPhone : Text;
    isActive : Bool;
  };

  type TeamMember = {
    id : Text;
    name : Text;
    designation : Text;
    department : Text;
    photoUrl : Text;
    email : Text;
    sortOrder : Nat;
    isActive : Bool;
  };

  type PartnerItem = {
    id : Text;
    name : Text;
    logoUrl : Text;
    website : Text;
    description : Text;
    sortOrder : Nat;
    isActive : Bool;
  };

  type ComplaintItem = {
    id : Text;
    userId : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    status : Text;
    createdAt : Text;
  };

  type FranchiseMachine = {
    id : Text;
    name : Text;
    description : Text;
    photoUrl : Text;
    rate : Text;
    unit : Text;
  };

  type FranchiseRawMaterial = {
    id : Text;
    name : Text;
    unit : Text;
    ratePerUnit : Text;
  };

  type FranchiseBlueprintStep = {
    id : Text;
    stepNumber : Nat;
    title : Text;
    description : Text;
  };

  type FranchisePlan = {
    id : Text;
    name : Text;
    price : Text;
    features : [Text];
    isPopular : Bool;
  };

  type LoanApplication = {
    id : Text;
    userId : Text;
    userName : Text;
    loanType : Text;
    amount : Text;
    purpose : Text;
    status : Text;
    appliedAt : Text;
  };

  type ProductItem = {
    id : Text;
    name : Text;
    description : Text;
    price : Text;
    imageUrl : Text;
    category : Text;
    stock : Text;
    isActive : Bool;
  };

  type VolunteerItem = {
    id : Text;
    userId : Text;
    userName : Text;
    skill : Text;
    hoursWorked : Text;
    area : Text;
    status : Text;
  };

  type YouTubeVideo = {
    id : Text;
    title : Text;
    youtubeUrl : Text;
    description : Text;
    isActive : Bool;
    sortOrder : Nat;
  };

  type CoreInitiative = {
    id : Text;
    icon : Text;
    title : Text;
    description : Text;
    linkUrl : Text;
    isActive : Bool;
    sortOrder : Nat;
  };

  type UserProfile = {
    id : Text;
    fullName : Text;
    mobile : Text;
    email : Text;
    passwordHash : Text;
    role : Text;
    status : Text;
    createdAt : Text;
    isVerified : Bool;
    accessCode : Text;
    isLoginActive : Bool;
    fatherName : Text;
    dob : Text;
    address : Text;
    district : Text;
    state : Text;
    pincode : Text;
    photoUrl : Text;
    memberId : Text;
  };

  type KYCRecord = {
    id : Text;
    userId : Text;
    aadhaarUrl : Text;
    photoUrl : Text;
    addressProofUrl : Text;
    bankName : Text;
    accountNumber : Text;
    ifscCode : Text;
    branchName : Text;
    status : Text;
    adminRemark : Text;
    submittedAt : Text;
  };

  // ==================== STABLE STORAGE ====================

  let contentMap = Map.empty<Text, Text>();

  let folders = Map.empty<Text, FolderReference>();
  let filesMap = Map.empty<Text, FileReference>();
  let deletedFiles = Map.empty<Text, FileReference>();
  let recentlyDeletedFiles = Map.empty<Text, FileReference>();

  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let approvalState = UserApproval.initState(accessControlState);

  let maxFileSize : Nat = 1000000000;

  // ==================== GENERIC KEY-VALUE CONTENT STORE ====================
  // We use JSON-encoded Text stored by key for simplicity and flexibility

  public shared func saveContent(key : Text, jsonValue : Text) : async () {
    contentMap.add(key, jsonValue);
  };

  public query func getContent(key : Text) : async ?Text {
    contentMap.get(key);
  };

  public query func getAllContent() : async [(Text, Text)] {
    contentMap.toArray();
  };

  public shared func deleteContent(key : Text) : async () {
    contentMap.remove(key);
  };

  // ==================== BLOB STORAGE ====================

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  public shared ({ caller }) func setMaxFileSize(newMaxFileSize : Nat) : async () {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      if (newMaxFileSize > 1000000000) {
        Runtime.trap("Max file size cannot be greater than 1GB");
      };
    } else {
      Runtime.trap("Unauthorized: Only admins can set max file size");
    };
  };

  public query func getAllFiles() : async [FileReference] {
    let files = filesMap.values().toArray();
    let deleted = deletedFiles.values().toArray();
    files.concat(deleted);
  };

  public query ({ caller }) func getFilesByCaller() : async [FileReference] {
    filesMap.values().filter(func(file) { file.createdBy == caller }).toArray();
  };

  public shared ({ caller }) func addFolder(folderId : Text, name : Text, parentId : ?FolderId, description : Text) : async () {
    if (not (UserApproval.isApproved(approvalState, caller) or AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only approved users can add folders");
    };
    if (folders.containsKey(folderId)) {
      Runtime.trap("Folder already exists");
    } else {
      let folderRef : FolderReference = {
        id = folderId;
        name;
        description;
        parentFolderId = parentId;
        files = [];
        createdBy = caller;
        createdAt = 0 : Int;
        isDeleted = false;
      };
      folders.add(folderId, folderRef);
    };
  };

  public shared ({ caller }) func renameFolder(folderId : Text, newName : Text) : async () {
    switch (folders.get(folderId)) {
      case (null) { Runtime.trap("Folder not found") };
      case (?folder) {
        let updatedFolder = { folder with name = newName };
        folders.add(folderId, updatedFolder);
      };
    };
  };

  public query func getFilesByFolderId(folderId : Text) : async [FileReference] {
    let files = filesMap.values().toArray();
    files.filter(func(entry) { entry.folderId == folderId });
  };

  public shared ({ caller }) func moveFileToFolderInternal(fileId : Text, newFolderId : Text) : async () {
    switch (filesMap.get(fileId)) {
      case (null) { Runtime.trap("File does not exist") };
      case (?fileRef) {
        let fileToMove = {
          fileRef with
          folderId = newFolderId;
        };
        filesMap.add(fileId, fileToMove);
      };
    };
  };

  public shared ({ caller }) func moveFolderInternal(folderId : Text, targetParentId : FolderId) : async () {
    if (folderId == targetParentId) {
      Runtime.trap("Cannot move folder into itself");
    };

    switch (folders.get(folderId)) {
      case (null) {
        Runtime.trap("Folder does not exist");
      };
      case (?folder) {
        if (folder.id == targetParentId) {
          Runtime.trap("Cannot move folder into itself");
        };
        let updatedFolder = { folder with parentFolderId = ?targetParentId };
        folders.add(folderId, updatedFolder);
      };
    };
  };

  public shared ({ caller }) func restoreFile(fileId : Text) : async () {
    switch (deletedFiles.get(fileId)) {
      case (null) { Runtime.trap("File does not exist in deleted files") };
      case (?deletedFile) {
        if (filesMap.containsKey(fileId)) {
          Runtime.trap("A file with the same ID already exists");
        } else {
          filesMap.add(fileId, deletedFile);
          recentlyDeletedFiles.remove(fileId);
        };
      };
    };
  };

  public shared ({ caller }) func deleteFile(fileId : Text) : async () {
    switch (filesMap.get(fileId)) {
      case (null) { Runtime.trap("File does not exist") };
      case (?fileRef) {
        let recentlyDeleted = {
          fileRef with
          isDeleted = true;
        };
        recentlyDeletedFiles.add(fileId, recentlyDeleted);
        filesMap.remove(fileId);
        deletedFiles.remove(fileId);
      };
    };
  };

  public shared ({ caller }) func deleteFolderInternal(folderId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete folders");
    };

    if (folders.containsKey(folderId)) {
      folders.remove(folderId);
      let iter = filesMap.filter(func(_, file) { file.folderId == folderId });
      iter.forEach(func(id, _) { filesMap.remove(id) });
    } else {
      Runtime.trap("Folder does not exist");
    };
  };

  public query func getAllFolders() : async [FolderReference] {
    let filter = folders.filter(func(_, folder) { not folder.isDeleted });
    filter.values().toArray();
  };

  public query func getFileById(fileId : FileId) : async ?FileReference {
    filesMap.get(fileId);
  };

  public query func getSimpleFileInfoById(fileId : FileId) : async ?SimpleFileInfo {
    switch (filesMap.get(fileId)) {
      case (null) { null };
      case (?file) {
        ?{
          id = file.id;
          name = file.name;
          blob = file.blob;
          size = file.size;
        };
      };
    };
  };

  public query func getFolderById(folderId : FolderId) : async ?FolderReference {
    folders.get(folderId);
  };

  public shared ({ caller }) func moveFileToFolderByReference(fileId : FileId, newFolderId : FolderId) : async () {
    switch (filesMap.get(fileId)) {
      case (null) { Runtime.trap("File does not exist") };
      case (?fileRef) {
        let updatedFileRef = { fileRef with folderId = newFolderId };
        filesMap.add(fileId, updatedFileRef);
      };
    };
  };

  public shared ({ caller }) func moveFileToRoot(fileId : FileId) : async () {
    switch (filesMap.get(fileId)) {
      case (null) { Runtime.trap("File does not exist") };
      case (?fileRef) {
        let updatedFileRef = {
          fileRef with
          folderId = "root";
        };
        filesMap.add(fileId, updatedFileRef);
      };
    };
  };

  public query func getAllFilesInFolders() : async [FileReference] {
    let fileValues = filesMap.values().toArray();
    fileValues.filter(func(file) { file.id.contains(#text "/") });
  };

  public query func getAllDeletedFiles() : async [FileReference] {
    deletedFiles.values().toArray();
  };
};
