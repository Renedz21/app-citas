import { Fragment } from 'react';
import { Button } from '@/modules/core/components/ui/button';

import GoogleIcon from '@/assets/icons/google.svg';
import AppleIcon from '@/assets/icons/apple.svg';
import { useSocialAuth } from '@/modules/core/hooks/auth/use-social-auth';

export function SocialButtons() {
  const { handleSocialSignIn, socialLoading } = useSocialAuth();

  return (
    <Fragment>
      <Button
        variant="outline"
        title="Continuar con Apple"
        onPress={() => handleSocialSignIn('oauth_apple')}
        icon={<AppleIcon width={24} height={24} />}
        disabled={socialLoading}
      />
      <Button
        variant="outline"
        title="Continuar con Google"
        onPress={() => handleSocialSignIn('oauth_google')}
        icon={<GoogleIcon width={24} height={24} />}
        disabled={socialLoading}
      />
    </Fragment>
  );
}
