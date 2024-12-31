import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  handlePress,
  title,
  titleStyles,
  containerStyles,
  disabled,
  height = 16,
}: {
  handlePress: () => void;
  title: string;
  titleStyles?: string;
  disabled?: boolean;
  containerStyles?: string;
  height?: number;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl  justify-center items-center ${containerStyles} ${
        disabled && "opacity-50"
      } h-${height}`}
      disabled={disabled}
    >
      <Text className={`text-primary  font-psemibold text-lg ${titleStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
