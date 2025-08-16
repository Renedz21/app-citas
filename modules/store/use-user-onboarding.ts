import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

type UserOnboardingState = {
  hasCompletedOnboarding: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  resetOnboarding: () => void;
};

const storage = new MMKV({
  id: 'user-onboarding-status',
  encryptionKey: '1234567890'
});

export const useUserOnboardingStore = create<UserOnboardingState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      setOnboardingCompleted: (completed) =>
        set({ hasCompletedOnboarding: completed }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false })
    }),
    {
      name: 'user-onboarding-status',
      storage: createJSONStorage(() => ({
        setItem: (name, value) => {
          return storage.set(name, JSON.stringify(value));
        },
        getItem: (name) => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        removeItem: (name) => {
          return storage.delete(name);
        }
      }))
    }
  )
);
