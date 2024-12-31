import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CategoryCard = ({
  title,
  isSelected = false,
  onPress,
}: {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      className={`mb-3 p-4 rounded-xl border ${
        isSelected ? "bg-blue-50 border-blue-200" : "bg-white border-gray-100"
      }`}
      onPress={onPress}
    >
      <Text
        className={`text-lg ${
          isSelected ? "text-blue-600 font-medium" : "text-gray-800"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
