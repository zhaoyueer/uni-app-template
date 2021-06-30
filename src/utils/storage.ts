// k-v cache for storage
let STORAGE_CACHE: Record<string, unknown> = {};

// Save storage value as variable
export const setStorage = (key: string, value: unknown): void => {
  try {
    STORAGE_CACHE[key] = value;
    uni.setStorageSync(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

// Get storage value as variable
export const getStorage: <T>(key: string) => T = (key) => {
  try {
    // get value from cache
    const cacheResult = STORAGE_CACHE[key];
    if (cacheResult) return cacheResult;

    // get value from storage
    const result = uni.getStorageSync(key);

    return result ? JSON.parse(result) : '';
  } catch (err) {
    return '';
  }
};

// Remove specific storage value
export const removeStorage = (key: string): void => {
  delete STORAGE_CACHE[key];
  try {
    uni.removeStorageSync(key);
  } catch (e) {}
};

// Clear all storage values
export const clearStorage = (): void => {
  STORAGE_CACHE = {};
  try {
    uni.clearStorageSync();
  } catch (e) {}
};
