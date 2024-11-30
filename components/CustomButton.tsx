import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  handlePress,
  title,
  titleStyles,
  containerStyles,
  disabled,
}: {
  handlePress: () => void;
  title: string;
  titleStyles?: string;
  disabled?: boolean;
  containerStyles?: string;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl justify-center items-center ${containerStyles} ${
        disabled && "opacity-50"
      }`}
      disabled={disabled}
    >
      <Text className={`text-primary font-psemibold text-lg ${titleStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
