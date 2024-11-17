import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { openPicker } from "@/helpers/openPicker";
import { icons } from "@/constants";
import { colors } from "@/static/filters/colors";
import CustomMultiSelect from "../Create/FilterSelector/CustomMultiSelect";
import { DocumentPickerAsset } from "expo-document-picker";

const EditSelectivImages = ({
  images,
  setImages,
}: {
  images: { image: DocumentPickerAsset; imageTag: null | string }[];
  setImages: any;
}) => {
  
  return (
    <>
      <View className="mt-2 space-y-2">
        <Text className="text-base text-gray-100 mb-2 font-pmedium">
          Selektiv Şəkillər
        </Text>
        <TouchableOpacity onPress={() => openPicker(setImages, "sub")}>
          <View className="w-full h-16 px-4 gap-2 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
            <Image
              source={icons.upload}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-100 font-pmedium ">
              Hamısını birlikdə seçin
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {images && (
        <View className="w-full flex-col gap-2">
          {images.map(
            (
              image: { image: DocumentPickerAsset; imageTag: null | string },
              index: number
            ) => {
              const { uri, name} = image.image;
              return (
                uri && (
                  <View
                    className="w-full items-center relative h-[200px] border border-gray-200 p-2 rounded-2xl flex-row"
                    key={name + index}
                  >
                    <Image
                      source={{ uri: uri }}
                      className="w-[48%] h-full"
                      resizeMode="contain"
                    />
                    <CustomMultiSelect
                      title=""
                      defaultSelectValues={
                        image.imageTag ? [image.imageTag] : []
                      }
                      placeholder="Rəng seçin"
                      data={{ title: "Rəng", value: colors }}
                      modalTitle="Rəng seçin"
                      handleChange={(value) => {
                        setImages((prev: any) => ({
                          ...prev,
                          subImages: images.map((item: any, i: number) => {
                            if (i === index) {
                              return {
                                ...item,
                                imageTag: value,
                              };
                            }
                            return item;
                          }),
                        }));
                      }}
                      containerStyles="w-[48%] ml-3"
                    />

                    <TouchableOpacity
                      className="w-8 h-8 top-3 absolute right-3 rounded-full bg-white border-black-200 border-2"
                      onPress={() =>
                        setImages((prev: any) => ({
                          ...prev,
                          subImages: images.filter(
                            (_: any, i: number) => i !== index
                          ),
                        }))
                      }
                    >
                      <Image
                        source={icons.closeRounded}
                        className="w-full h-full"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                )
              );
            }
          )}
        </View>
      )}
    </>
  );
};

export default EditSelectivImages;
