import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const CustomLoader = ({
  animating,
  color,
  size,
}: {
  animating: boolean;
  color?: string;
  size?: "small" | "large" | number;
}) => (
  <View className="w-full flex-col flex-1 min-h-dvh justify-center backdrop-blur items-center">
    <ActivityIndicator animating={animating} color={color} size={size} />
  </View>
);

export default CustomLoader;
