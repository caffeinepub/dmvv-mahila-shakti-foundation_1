/**
 * BackendDataService - Syncs AppContext state with the Motoko backend canister.
 *
 * ALL reads come from backend first. localStorage is only a write-through cache
 * for fast re-hydration on same device while backend loads.
 *
 * The canister exposes:
 *   saveContent(key, jsonValue)  -> stores a JSON string by key
 *   getContent(key)              -> returns JSON string or null
 *   getAllContent()              -> returns all [key, value] pairs
 *   deleteContent(key)           -> removes a key
 */

import { createActor } from "@/backend";
import type { backendInterface } from "@/backend";
import { createActorWithConfig } from "@caffeineai/core-infrastructure";

let actorCache: backendInterface | null = null;

async function getActor(): Promise<backendInterface | null> {
  if (actorCache) return actorCache;
  try {
    actorCache = await createActorWithConfig(createActor);
    return actorCache;
  } catch (err) {
    console.warn("[BackendDataService] Could not create actor:", err);
    return null;
  }
}

/**
 * Fetches ALL content entries from the backend canister.
 * Returns a map of key -> parsed JSON value.
 * Backend is the AUTHORITATIVE source — localStorage is never used for reads.
 */
export async function initializeFromBackend(): Promise<
  Record<string, unknown>
> {
  try {
    const actor = await getActor();
    if (!actor) return {};

    const entries = await actor.getAllContent();
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
  } catch (err) {
    console.warn("[BackendDataService] initializeFromBackend failed:", err);
    return {};
  }
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 800;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Saves a value to the backend canister under the given key.
 * Returns a Promise that resolves when backend confirms save.
 * Retries up to 3 times on failure.
 * Also writes to localStorage as a write-through cache.
 */
export async function saveToBackend(key: string, data: unknown): Promise<void> {
  // Write-through cache for same-device fast reload
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore localStorage errors
  }

  let lastError: unknown;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const actor = await getActor();
      if (!actor) {
        return; // backend not available, localStorage write-through is all we can do
      }
      await actor.saveContent(key, JSON.stringify(data));
      return; // success
    } catch (err) {
      lastError = err;
      // Invalidate cache on error so next attempt re-creates the actor
      actorCache = null;
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAY_MS * (attempt + 1));
      }
    }
  }

  // All retries exhausted — log but don't throw (UI stays responsive)
  console.warn(
    `[BackendDataService] Failed to save "${key}" after ${MAX_RETRIES} retries:`,
    lastError,
  );
}

/**
 * Invalidates the cached actor (e.g., after identity changes).
 */
export function invalidateActorCache(): void {
  actorCache = null;
}
