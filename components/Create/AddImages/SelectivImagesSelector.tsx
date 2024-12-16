import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { openPicker } from "@/helpers/openPicker";
import { icons } from "@/constants";
import { colors } from "@/static/filters/colors";
import CustomMultiSelect from "../FilterSelector/CustomMultiSelect";
import { IProductImages } from "@/types/interfaces";

const SelectivImagesSelector = ({
  images,
  setImages,
  deleteImage,
  disabled = false,
}: {
  images: IProductImages;
  setImages?: any;
  deleteImage: (imageId: string | number) => void;
  disabled?: boolean;
}) => {
  const selectedTags: string[] = images.subImages
    ? images.subImages.map((i) => i.imageTag).filter((i) => i !== null)
    : [];
  return (
    <>
      <View className="mt-2 space-y-2">
        <Text className="text-base text-gray-100 mb-2 font-pmedium">
          {!disabled ? "Yeni şəkil əlavə et" : "Selektiv Şəkillər"}
        </Text>
        {!disabled && (
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
        )}
      </View>

      {images.subImages && (
        <View className="w-full flex-col gap-2">
          {images.subImages.map(
            (
              image: {
                imageUrl: string;
                imageTag: string | null;
                imageId: string | null;
              },
              index: number
            ) => {
              return (
                image.imageUrl && (
                  <View
                    className="w-full items-center relative h-[200px] border border-gray-200 p-2 rounded-2xl flex-row"
                    key={image.imageUrl + index}
                  >
                    <Image
                      source={{ uri: image.imageUrl }}
                      className="w-[48%] h-full"
                      resizeMode="contain"
                    />
                    {disabled ? (
                      <View className={`w-[48%] ml-3 `}>
                        <Text className="text-base text-gray-100 font-pmedium mb-2">
                          {image.imageTag || "Seçilməyib"}
                        </Text>
                      </View>
                    ) : (
                      <CustomMultiSelect
                        title=""
                        defaultSelectValues={
                          image.imageTag ? [image.imageTag] : []
                        }
                        placeholder="Rəng seçin"
                        data={{
                          title: "Rəng",
                          value: colors,
                        }}
                        modalTitle="Rəng seçin"
                        handleChange={(value) => {
                          setImages({
                            ...images,
                            subImages: images.subImages.map(
                              (item: any, i: number) => {
                                if (i === index) {
                                  return {
                                    ...item,
                                    imageTag: value[0],
                                  };
                                }
                                return item;
                              }
                            ),
                          });
                        }}
                        containerStyles="w-[48%] ml-3"
                        disabledValues={selectedTags}
                      />
                    )}

                    <TouchableOpacity
                      className="w-8 h-8 top-3 absolute right-3 rounded-full bg-white border-black-200 border-2"
                      onPress={() =>
                        Alert.alert(
                          "Bu şəkili silmək istədiyinizdən əminsiniz?",
                          "Bu əməliyyatı geri qaytarmaq mümkün olmayacaq",
                          [
                            {
                              text: "Xeyr",
                              style: "cancel",
                            },
                            {
                              text: "Bəli",
                              onPress: () => {
                                disabled
                                  ? deleteImage(image.imageId as string)
                                  : deleteImage(index);
                              },
                            },
                          ]
                        )
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

export default SelectivImagesSelector;
