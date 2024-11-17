import * as React from "react";
import { Modal, StatusBar } from "react-native";
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
  <Modal animationType="slide" transparent={true} visible={animating}>
    <View className="items-center justify-center w-full h-full bg-transparent/60">
      <ActivityIndicator animating={animating} color={color} size={size} />
    </View>
    <StatusBar barStyle="dark-content" backgroundColor={"#000"} />
  </Modal>
);

export default CustomLoader;
