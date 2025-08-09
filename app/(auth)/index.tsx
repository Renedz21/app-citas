import { useCallback, useMemo, useRef } from 'react';
import { ImageBackground, Platform, Text, View } from 'react-native';

import { useRouter } from 'expo-router';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Separator } from '@/modules/core/components/ui/separator';
import { SocialButtons } from '@/modules/core/components/shared/social-buttons';
import { Button } from '@/modules/core/components/ui/button';

function AuthSheetContent() {
  const router = useRouter();

  const handleSignIn = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  const handleSignUp = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  return (
    <View className="elevation-2 gap-3 p-4">
      <Button title="Inicia sesión" onPress={handleSignIn} />
      <Button
        variant="outline"
        title="Regístrate con tu correo"
        onPress={handleSignUp}
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

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['40%'], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand({
      duration: 300
    });
  }, []);

  return (
    <View className="flex-1 bg-neutral-900">
      <ImageBackground
        source={require('../../assets/images/splash-icon.png')}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 justify-between p-6">
          <View className="pt-4">
            <Text className="text-lg text-white/90">Welcome to Montek 👋</Text>
          </View>
          <View>
            <Text className="mb-6 text-4xl font-extrabold leading-[42px] text-white">
              Better Homes,
              {'\n'}Smarter, For
              {'\n'}Your Finance.
            </Text>
            <Button
              accessibilityLabel="Iniciemos"
              variant={'secondary'}
              title="Iniciemos"
              onPress={openSheet}
            />
          </View>
        </View>
      </ImageBackground>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        android_keyboardInputMode={Platform.select({ android: 'adjustResize' })}
        keyboardBehavior={Platform.select({
          ios: 'interactive',
          android: 'extend'
        })}
        backgroundStyle={{ backgroundColor: '#ffffff' }}
        handleIndicatorStyle={{ backgroundColor: '#e5e7eb' }}
      >
        <BottomSheetView>
          <AuthSheetContent />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
