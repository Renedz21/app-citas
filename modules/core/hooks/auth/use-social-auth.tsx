import { useCallback, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import { useSSO } from '@clerk/clerk-expo';

export type SocialProvider = 'oauth_google' | 'oauth_apple';

export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const [socialLoading, setSocialLoading] = useState(false);

  const handleSocialSignIn = useCallback(
    async (strategy: SocialProvider) => {
      setSocialLoading(true);
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy,
          redirectUrl: AuthSession.makeRedirectUri({
            path: '/',
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
      }
    },
    [startSSOFlow]
  );

  return {
    handleSocialSignIn,
    socialLoading
  };
}
