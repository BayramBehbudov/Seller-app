import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ISelectedCat } from "@/app/(tabs)/create";
import { categories } from "@/static/categories";

const CatInput = ({
  setModalVisible,
  selectedCategory,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: ISelectedCat;
}) => {
  return (
    <TouchableOpacity
      className={`border-2 border-black-200 w-full h-12 flex-row  bg-black-100   rounded-2xl focus:border-secondary items-center p-3`}
      onPress={() => setModalVisible(true)}
    >
      <Text className={`text-base text-gray-100  font-pmedium`}>
        {selectedCategory.main
          ? categories[selectedCategory.main]?.title
          : "Seç"}

        {selectedCategory.sub &&
          " > " +
            categories[selectedCategory.main]?.subs[selectedCategory.sub]
              ?.title}

        {selectedCategory.child &&
          " > " +
            categories[selectedCategory.main]?.subs[selectedCategory.sub]
              ?.child[selectedCategory.child]?.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CatInput;
