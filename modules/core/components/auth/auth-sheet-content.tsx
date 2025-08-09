import { useCallback } from 'react';
import { Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import { Separator } from '@/modules/core/components/ui/separator';
import { SocialButtons } from '@/modules/core/components/shared/social-buttons';
import { Button } from '@/modules/core/components/ui/button';

export function AuthSheetContent() {
  const router = useRouter();

  const handleSignIn = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  const handleSignUp = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  return (
    <View className="elevation-2 gap-3 p-4">
      <Button title="Inicia sesión" onPress={handleSignIn} testID="sign_in" />
      <Button
        variant="outline"
        title="Regístrate con tu correo"
        onPress={handleSignUp}
        testID="sign_up"
      />
      <View className="relative my-4">
        <Separator />
        <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
          <Text className="text-base text-neutral-500">Ó</Text>
        </View>
      </View>
      <SocialButtons />
    </View>
  );
}
