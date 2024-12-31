import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ISelectedCat } from "@/app/(tabs)/create";
import { categories } from "@/static/categories";

const CategoryBreadCrump = ({
  selectedCategory,
  setCurrentStep,
  setSelectedCategory,
}: {
  selectedCategory: ISelectedCat;
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"main" | "sub" | "child">
  >;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ISelectedCat>>;
}) => {
  return (
    <View className="flex-row items-center gap-2 p-4 border-b border-gray-100">
      <TouchableOpacity
        onPress={() => {
          setCurrentStep("main");
          setSelectedCategory({
            main: "",
            sub: "",
            child: "",
          });
        }}
      >
        <Text className="text-xl font-medium text-blue-600">
          {categories[selectedCategory?.main]?.title}
        </Text>
      </TouchableOpacity>

      {selectedCategory.sub && (
        <>
          <Text className="text-xl text-gray-400">/</Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentStep("sub");
              setSelectedCategory({
                main: selectedCategory.main,
                sub: "",
                child: "",
              });
            }}
          >
            <Text className="text-xl font-medium text-blue-600">
              {
                categories[selectedCategory?.main]?.subs[selectedCategory?.sub]
                  ?.title
              }
            </Text>
          </TouchableOpacity>
        </>
      )}

      {selectedCategory?.child && (
        <>
          <Text className="text-xl text-gray-400">/</Text>
          <Text className="text-xl font-medium text-blue-600">
            {
              categories[selectedCategory?.main]?.subs[selectedCategory?.sub]
                ?.child[selectedCategory?.child]?.title
            }
          </Text>
        </>
      )}
    </View>
  );
};

export default CategoryBreadCrump;
