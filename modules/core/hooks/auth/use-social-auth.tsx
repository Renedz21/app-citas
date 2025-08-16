import { useCallback, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { useSSO } from '@clerk/clerk-expo';
import { useUserOnboardingStore } from '@/modules/store/use-user-onboarding';

export type SocialProvider = 'oauth_google' | 'oauth_apple';

export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const [socialLoading, setSocialLoading] = useState(false);
  const { hasCompletedOnboarding, resetOnboarding, setOnboardingCompleted } =
    useUserOnboardingStore();

  const handleSocialSignIn = useCallback(
    async (strategy: SocialProvider) => {
      setSocialLoading(true);
      resetOnboarding();
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri({
            path: hasCompletedOnboarding === false ? '/onboarding' : '/',
            scheme: 'appcitas'
          })
        });

        if (createdSessionId) {
          setActive!({ session: createdSessionId });
        }
      } catch (error) {
        console.error('Social sign in error', JSON.stringify(error, null, 2));
      } finally {
        setSocialLoading(false);
        setOnboardingCompleted(true);
      }
    },
    [
      startSSOFlow,
      hasCompletedOnboarding,
      resetOnboarding,
      setOnboardingCompleted
    ]
  );

  return {
    handleSocialSignIn,
    socialLoading
  };
}
