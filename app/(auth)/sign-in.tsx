import { useCallback, useMemo, useRef } from "react";
import { ImageBackground, Platform, Pressable, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";

function AuthSheetContent() {
  return (
    <View className="gap-3 p-4">
      <Pressable className="items-center rounded-full bg-blue-600 py-4">
        <Text className="text-base font-semibold text-white">Sign Up</Text>
      </Pressable>
      <Pressable className="items-center rounded-full bg-neutral-900 py-4">
        <Text className="text-base font-semibold text-white">
          Login to Montek
        </Text>
      </Pressable>
      <View className="my-2 h-px bg-neutral-200" />
      <Pressable className="flex-row items-center justify-center gap-3 rounded-full bg-white py-4">
        <Text className="text-base font-medium text-neutral-900">
          Continue with Apple
        </Text>
      </Pressable>
      <Pressable className="flex-row items-center justify-center gap-3 rounded-full bg-white py-4">
        <Text className="text-base font-medium text-neutral-900">
          Continue with Google
        </Text>
      </Pressable>
    </View>
  );
}

export default function SignIn() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["35%"], []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  return (
    <View className="flex-1 bg-neutral-900">
      <ImageBackground
        source={require("../../assets/images/splash-icon.png")}
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
              {"\n"}Smarter, For
              {"\n"}Your Finance.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={openSheet}
              className="items-center rounded-full bg-white py-4"
              android_ripple={{ color: "#e5e7eb" }}
            >
              <Text className="text-base font-semibold text-neutral-900">
                Let's Go!
              </Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        android_keyboardInputMode={Platform.select({ android: "adjustResize" })}
        keyboardBehavior={Platform.select({
          ios: "interactive",
          android: "extend",
        })}
        backgroundStyle={{ backgroundColor: "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: "#e5e7eb" }}
      >
        <BottomSheetView>
          <AuthSheetContent />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
