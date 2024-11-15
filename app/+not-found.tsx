import { Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex items-center justify-center text-5xl">
        Axtardığınızı tapammadıx
      </View>
    </>
  );
}
