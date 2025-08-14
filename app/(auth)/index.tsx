import { useCallback, useMemo, useRef } from 'react';
import { Platform, Text, View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Button } from '@/modules/core/components/ui/button';
import { AuthSheetContent } from '@/modules/core/components/auth/auth-sheet-content';
import { useRouter } from 'expo-router';

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const snapPoints = useMemo(() => ['40%'], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand({
      duration: 200
    });
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* TODO: Replace this color background with a proper background image */}
      <View className="flex-1 bg-gradient-to-b from-blue-600 to-blue-800">
        <View className="flex-1 justify-between p-6">
          <View className="pt-4">
            <Text className="text-lg text-white/90">Welcome to Montek</Text>
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
              onPress={() => router.push('/onboarding')}
              testID="start_on_app"
            />
            <Button
              accessibilityLabel="Iniciemos"
              variant={'secondary'}
              title="Iniciemos"
              onPress={openSheet}
              testID="start_on_app"
            />
          </View>
        </View>
      </View>

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
