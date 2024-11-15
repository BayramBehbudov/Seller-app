import { View, TextInput, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const SearchInput = ({
  setFilters,
  type,
  placeholder,
  className,
}: {
  setFilters: (prev: any) => void;
  type: "search" | "id";
  placeholder: string;
  className?: string;
}) => {
  return (
    <View
      className={`border-2 border-black-200 h-12 flex-row px-4 bg-black-100 rounded-2xl focus:border-secondary items-center justify-center ${className}`}
    >
      <TextInput
        className="mt-0.5 flex-1 p-1 font-pregular text-base focus:outline-none text-white"
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) =>
          setFilters((prev: any) => {
            return type === "id"
              ? { ...prev, id: e && e.length === 6 ? e.toLowerCase() : null }
              : type === "search" && {
                  ...prev,
                  search: e ? e.toLowerCase() : null,
                };
          })
        }
      />
      <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
    </View>
  );
};

export default SearchInput;
