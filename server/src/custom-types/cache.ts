export type CacheManager = {
  del: (key: string) => Promise<void>;
  set: (key: string, value: any, {}: { ttl: number }) => Promise<void>;
  get: <T>(key: string) => Promise<T>;
  keys: () => Promise<string[]>;
};
