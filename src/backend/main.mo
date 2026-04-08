import Map "mo:core/Map";
import Migration "migration";

(with migration = Migration.run)
actor {

  // ==================== GENERIC KEY-VALUE CONTENT STORE ====================
  // All site content, form submissions, settings, and dynamic data are stored
  // as JSON-encoded Text keyed by a unique string identifier.
  // State persists automatically via enhanced orthogonal persistence.

  let contentMap = Map.empty<Text, Text>();

  /// Save or overwrite a value for the given key.
  public shared func saveContent(key : Text, jsonValue : Text) : async () {
    contentMap.add(key, jsonValue);
  };

  /// Retrieve the value for a given key. Returns null if not found.
  public query func getContent(key : Text) : async ?Text {
    contentMap.get(key);
  };

  /// Return all key-value pairs currently stored.
  public query func getAllContent() : async [(Text, Text)] {
    contentMap.toArray();
  };

  /// Delete the entry for a given key (no-op if the key does not exist).
  public shared func deleteContent(key : Text) : async () {
    contentMap.remove(key);
  };

};
