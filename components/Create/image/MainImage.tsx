import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { SetStateAction } from "react";
import { openPicker } from "@/helpers/openPicker";
import { icons } from "@/constants";
import { IProduct } from "@/types/interfaces";

const MainImage = ({
  image,
  setImages,
  style,
  disabled = false,
}: {
  image: IProduct["image"];
  setImages: () => void;
  style?: { [key: string]: string | number };
  disabled?: boolean;
}) => {
  return (
    <View
      className={`w-full h-[200px] flex-row justify-between border border-gray-200 p-2 rounded-2xl mb-5 `}
      style={style}
    >
      <TouchableOpacity onPress={setImages} className="w-[48%] h-full">
        {!disabled ? (
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
        ) : (
          <View className="w-full h-full bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-col gap-2"></View>
        )}
      </TouchableOpacity>
      <View className="w-[48%] h-full flex flex-col gap-2">
        {image?.imageUrl ? (
          <Image
            source={{ uri: image.imageUrl }}
            className="w-full  h-full rounded-2xl"
            resizeMode="contain"
          />
        ) : (
          <Text className="text-sm text-gray-100 w-full h-full items-center p-2 justify-center flex-wrap  font-pmedium text-start">
            Bu şəkil məhsul görünən hissələrdə ilk görünən şəkil olacaq. Mütləq
            seçilməlidir.
          </Text>
        )}
      </View>
    </View>
  );
};

export default MainImage;
