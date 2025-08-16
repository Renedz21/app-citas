import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Stack, ErrorBoundary } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView
} from 'react-native-safe-area-context';

import { ReactQueryProvider } from '@/modules/core/providers/query-provider';

import '../global.css';
import { tokenCache } from '@/lib/token-cache';

export { ErrorBoundary };

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error('Missing Clerk publishable key');
}

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true
});

function InitialLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isSignedIn}>
          <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        </Stack.Protected>
        <Stack.Protected guard={!!isSignedIn}>
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        </Stack.Protected>
      </Stack>
      <StatusBar style="auto" animated={true} />
    </SafeAreaView>
  );
}
export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <KeyboardProvider>
          <ClerkProvider
            publishableKey={publishableKey}
            tokenCache={tokenCache}
          >
            <ReactQueryProvider>
              <ThemeProvider value={DefaultTheme}>
                <InitialLayout />
              </ThemeProvider>
            </ReactQueryProvider>
          </ClerkProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
