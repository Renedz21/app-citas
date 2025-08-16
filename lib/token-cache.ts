import { TokenCache } from '@clerk/clerk-expo';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({
  id: 'clerk-storage',
  encryptionKey: 'clerk-storage'
});

export const tokenCache: TokenCache = {
  getToken: async (key: string) => {
    return storage.getString(key) ?? null;
  },
  saveToken: async (key: string, value: string) => {
    storage.set(key, value);
  },
  clearToken: (key: string) => {
    storage.delete(key);
  }
};
