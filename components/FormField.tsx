import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const FormField = ({
  title,
  text,
  placeholder,
  handleChange,
  otherStyles,
  keyboardType,
  value,
  error,
}: {
  title: string;
  text: string;
  placeholder?: string;
  handleChange?: (value: string) => void;
  otherStyles?: string;
  keyboardType?: "phone-pad" | "email-address" | "numeric";
  value?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles} gap-2`}>
      <Text className={`text-base text-gray-100  font-pmedium`}>{text}</Text>

      <View
        className={`border-2 border-black-200 w-full  flex-row px-4 bg-black-100 rounded-2xl focus:border-secondary items-center  ${
          title === "description" ? 120 : "h-12"
        }`}
      >
        <TextInput
          className={`flex-1 text-white font-psemibold text-base focus:outline-none ${
            title === "description" ? "h-[120px] align-top py-2" : ""
          }`}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChange}
          keyboardType={keyboardType ? keyboardType : "default"}
          secureTextEntry={title === "password" && !showPassword}
          multiline={title === "description"}
          numberOfLines={title === "description" ? 4 : 1}
          value={value}
        />

        {title === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-500 w-full overflow-hidden text-sm">
          {error.toString()}
        </Text>
      )}
    </View>
  );
};

export default FormField;
