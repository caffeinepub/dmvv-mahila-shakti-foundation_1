/**
 * BackendDataService - Syncs AppContext state with the Motoko backend canister.
 *
 * This enables admin updates to be visible to ALL users globally,
 * not just on the admin's device (which was the localStorage-only limitation).
 *
 * The canister exposes:
 *   saveContent(key, jsonValue)  -> stores a JSON string by key
 *   getContent(key)              -> returns JSON string or null
 *   getAllContent()              -> returns all [key, value] pairs
 *   deleteContent(key)           -> removes a key
 *
 * These methods are declared in backendInterface (backend.d.ts) but may not
 * be reflected in the auto-generated _SERVICE type yet, so we cast via `any`.
 */

import { createActorWithConfig } from "@/config";

type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

let _actorCache: AnyActor | null = null;
let _actorCachePromise: Promise<AnyActor> | null = null;

/**
 * Get (or create) an anonymous actor for reading/writing content.
 * We use an anonymous actor so non-logged-in users can also read content.
 */
async function getAnonymousActor(): Promise<AnyActor | null> {
  if (_actorCache) return _actorCache;
  if (_actorCachePromise) return _actorCachePromise;

  _actorCachePromise = createActorWithConfig().then((actor) => {
    _actorCache = actor as unknown as AnyActor;
    return _actorCache;
  });

  return _actorCachePromise;
}

/**
 * Fetches ALL content entries from the backend canister.
 * Returns a map of key -> parsed JSON value.
 * Returns empty object on any error (graceful fallback to localStorage).
 */
export async function initializeFromBackend(): Promise<
  Record<string, unknown>
> {
  try {
    const actor = await getAnonymousActor();
    if (!actor || typeof actor.getAllContent !== "function") {
      return {};
    }
    const entries = (await actor.getAllContent()) as Array<[string, string]>;
    if (!Array.isArray(entries)) return {};

    const result: Record<string, unknown> = {};
    for (const [key, value] of entries) {
      try {
        result[key] = JSON.parse(value);
      } catch {
        // skip malformed entries
      }
    }
    return result;
  } catch {
    // Backend unavailable or method not found — fall back to localStorage
    return {};
  }
}

/**
 * Saves a value to the backend canister under the given key.
 * Silently fails so that localStorage remains the fallback.
 */
export async function saveToBackend(key: string, data: unknown): Promise<void> {
  try {
    const actor = await getAnonymousActor();
    if (!actor || typeof actor.saveContent !== "function") {
      return;
    }
    await actor.saveContent(key, JSON.stringify(data));
  } catch {
    // silently fail - localStorage is the fallback
  }
}

/**
 * Invalidates the cached actor (e.g., after identity changes).
 */
export function invalidateActorCache(): void {
  _actorCache = null;
  _actorCachePromise = null;
}
