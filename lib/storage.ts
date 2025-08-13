import { SupportedStorage } from '@supabase/supabase-js';
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({
  id: 'supabase-storage',
  encryptionKey: process.env.EXPO_PUBLIC_MMKV_ENCRYPTION_KEY!
});

export const customStorage: SupportedStorage = {
  getItem: (key: string) => {
    return storage.getString(key) ?? null;
  },
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  }
};
