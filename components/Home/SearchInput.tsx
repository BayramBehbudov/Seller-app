import { View, TextInput, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const SearchInput = ({
  setFilters,
  type,
  placeholder,
  inputStyle,
  defaultValue,
}: {
  setFilters: (prev: any) => void;
  type: "search" | "id";
  placeholder: string;
  inputStyle?: { [key: string]: string | number };
  defaultValue?: string | null;
}) => {
  return (
    <TextInput
      style={[
        inputStyle,
        {
          borderRadius: 10,
          padding: 10,
          borderColor: "#e0e0e0",
          borderWidth: 1,
        },
      ]}
      defaultValue={defaultValue || ""}
      placeholder={placeholder}
      placeholderTextColor={"black"}
      onChangeText={(e) =>
        setFilters((prev: any) => {
          return type === "id"
            ? { ...prev, id: e ? e.toLowerCase() : null }
            : type === "search" && {
                ...prev,
                search: e ? e.toLowerCase() : null,
              };
        })
      }
    />
  );
};

export default SearchInput;
