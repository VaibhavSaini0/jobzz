type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const store = new Map<string, CacheEntry<unknown>>();

export async function cachedFetch<T = unknown>(
  url: string,
  options?: RequestInit & { ttlMs?: number }
): Promise<T> {
  const ttlMs = options?.ttlMs ?? 60_000;
  const cacheKey = `${url}:${options?.method ?? "GET"}`;
  const now = Date.now();
  const hit = store.get(cacheKey);

  if (hit && hit.expiresAt > now) {
    return hit.data as T;
  }

  const { ttlMs: _, ...fetchOptions } = options ?? {};
  const res = await fetch(url, fetchOptions);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = (await res.json()) as T;
  store.set(cacheKey, { data, expiresAt: now + ttlMs });
  return data;
}

export function invalidateClientCache(prefix?: string) {
  if (!prefix) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) {
      store.delete(key);
    }
  }
}
