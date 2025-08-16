import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { FormValues } from '@/modules/schemas/onboarding.schema';
import { MMKV } from 'react-native-mmkv';

type PartialFormValues = Partial<FormValues>;

type OnboardingState = {
  formData: PartialFormValues;
  updateFormData: (step: keyof FormValues, data: any) => void;
  clearFormData: () => void;
};

const storage = new MMKV({
  id: 'onboarding-storage',
  encryptionKey: '1234567890'
});

const initialState: PartialFormValues = {
  profileType: {
    profile_type: ''
  },
  clientData: {
    age: 0,
    gender: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  },
  professionalData: {
    profession: '',
    business_name: '',
    phone: ''
  }
};

export const clearOnboardingStorage = () => {
  storage.clearAll();
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      formData: initialState,
      updateFormData: (step, data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [step]: {
              ...state.formData[step],
              ...data
            }
          }
        })),
      clearFormData: () => {
        clearOnboardingStorage();
        set({ formData: { ...initialState } });
      }
    }),
    {
      name: 'user-onboarding-storage',
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
