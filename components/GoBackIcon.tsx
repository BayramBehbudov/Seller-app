import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const GoBackIcon = ({
  className,
  iconColor = "black",
  size = 30,
  text,
  textStyle,
}: {
  className?: string;
  iconColor?: string;
  size?: number;
  text?: string;
  textStyle?: { [key: string]: string | number };
}) => {
  return (
    <TouchableOpacity
      className={`flex flex-row gap-3 items-center ${className}`}
      onPress={() => router.back()}
    >
      <FontAwesome6 name="arrow-left-long" size={size} color={iconColor} />
      {text && <Text style={textStyle}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default GoBackIcon;
