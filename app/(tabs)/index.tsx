import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/(auth)/sign-in">Sign In</Link>
    </View>
  );
}
