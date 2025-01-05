import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const GoBackIcon = ({
  className,
  iconColor = "black",
  size = 30,
  text,
  textClassName,
}: {
  className?: string;
  iconColor?: string;
  size?: number;
  text?: string;
  textClassName?: string;
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row gap-3 items-center ${className}`}
      onPress={() => router.back()}
    >
      <FontAwesome6 name="arrow-left-long" size={size} color={iconColor} />
      {text && <Text className={textClassName}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default GoBackIcon;
