import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { openPicker } from "@/helpers/openPicker";
import { icons } from "@/constants";
import { IProductImages, ISelectedCategoryStructure } from "@/types/interfaces";
import { translateAttributes } from "@/helpers/translateFilters";
import CustomMultiSelect from "@/components/CustomMultiSelect";


const SelectivImagesSelector = ({
  images,
  setImages,
  deleteImage,
  disabled = false,
  selectedCategory,
}: {
  images: IProductImages;
  setImages?: any;
  deleteImage: (imageId: string | number) => void;
  disabled?: boolean;
  selectedCategory?: ISelectedCategoryStructure;
}) => {
  const selectedTags = images.subImages
    ? images.subImages.map((i) => i.imageTag).filter((i) => i !== null)
    : [];

  const attr = selectedCategory
    ? [
        ...selectedCategory.main.filters,
        ...selectedCategory.sub.filters,
        ...selectedCategory.child.filters,
      ]
    : [];

  return (
    <>
      <View className="mt-2 space-y-2">
        <Text className="text-base text-gray-100 mb-2 font-pmedium">
          Alternativ şəkillər {!disabled && "əlavə et"}
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
                    className="w-full items-center relative  border border-gray-200 rounded-2xl flex-row p-2"
                    key={image.imageUrl + index}
                  >
                    <Image
                      source={{ uri: image.imageUrl }}
                      className="w-[48%] h-[200px]  max-h-[300px]"
                      resizeMode="contain"
                    />

                    {disabled ? (
                      <View className={`w-[48%] ml-3 `}>
                        <Text className="text-base text-gray-100 font-pmedium mb-2">
                          {image.imageTag || "Seçilməyib"}
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-col w-full ml-2 pt-7 gap-1">
                        {attr.map((a) => {
                          const { title, value } = a;
                          return (
                            <CustomMultiSelect
                              triggerClassName="w-[48%]"
                              multiSelect={title === "color" ? false : true}
                              disabledValues={selectedTags}
                              data={a}
                              placeholder={translateAttributes(title)}
                              modalTitle={translateAttributes(title) + " seçin"}
                              key={title + index}
                              handleChange={(v: string[]) => {
                                setImages({
                                  ...images,
                                  subImages: images.subImages.map(
                                    (item: any, i: number) => {
                                      if (i === index) {
                                        return {
                                          ...item,
                                          imageTag: v[0],
                                        };
                                      }
                                      return item;
                                    }
                                  ),
                                });
                              }}
                              // aşağıda düzəliş edilməlidir
                              defaultSelectValues={
                                image.imageTag ? [image.imageTag] : []
                              }
                            />
                          );
                        })}
                      </View>
                    )}

                    <TouchableOpacity
                      className="w-8 h-8 top-1 absolute right-1 rounded-full bg-white border-black-200 border-2"
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
