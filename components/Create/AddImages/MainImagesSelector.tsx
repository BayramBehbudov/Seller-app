import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { openPicker } from "@/helpers/openPicker";
import { icons } from "@/constants";
import { IProductImages } from "@/types/interfaces";

const MainImagesSelector = ({
  images,
  setImages,
}: {
  images: IProductImages;
  setImages: any;
}) => {
  return (
    <>
      <Text className={`text-base text-gray-100 font-pmedium`}>Əsas şəkil</Text>
      <View className="w-full h-[200px] flex-row justify-between border border-gray-200 p-2 rounded-2xl">
        <TouchableOpacity
          onPress={() => openPicker(setImages, "main")}
          className="w-[48%] h-full"
        >
          <View className="w-full h-full bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-col gap-2">
            <Image
              source={icons.upload}
              className="w-6 h-6"
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-100 font-pmedium">
              Əsas şəkili seçin
            </Text>
          </View>
        </TouchableOpacity>
        <View className="w-[48%] h-full flex flex-col gap-2">
          {images?.main?.imageUrl ? (
            <Image
              source={{ uri: images.main.imageUrl }}
              className="w-full  h-full rounded-2xl"
              resizeMode="contain"
            />
          ) : (
            <Text className="text-sm text-gray-100 w-full h-full items-center p-2 justify-center flex-wrap  font-pmedium text-start">
              Bu şəkil məhsul görünən hissələrdə ilk görünən şəkil olacaq
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default MainImagesSelector;
