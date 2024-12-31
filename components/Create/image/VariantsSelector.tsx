import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { generateUniqueId, openPicker } from "@/helpers/openPicker";
import { icons } from "@/constants";
import { translateAttributes } from "@/helpers/translateFilters";
import CustomMultiSelect from "@/components/CustomMultiSelect";
import { categories } from "@/static/categories";
import { IProduct, IProductVariant } from "@/types/interfaces";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const VariantsSelector = ({
  selectedCategory,
  variants,
  formData,
  setFormData,
}: {
  selectedCategory: IProduct["category"];
  variants: IProductVariant[];
  formData: IProduct & { store: string };
  setFormData: React.Dispatch<
    React.SetStateAction<IProduct & { store: string }>
  >;
}) => {
  const [disabledValues, setDisabledValues] = useState<
    Record<string, string[]>
  >({
    color: [],
  });

  useEffect(() => {
    let disabled: Record<string, string[]> = {
      color: [],
    };
    variants.forEach((v: IProductVariant) => {
      for (const key in v.attributes) {
        if (key === "color") {
          disabled.color = [...disabled.color, ...v.attributes.color];
        }
      }
    });

    setDisabledValues(disabled);
  }, [variants]);

  const handleChange = (key: string, value: string[], variantId: string) => {
    const newVariants = variants.map((v) =>
      v._id === variantId
        ? value.length > 0
          ? { ...v, attributes: { ...v.attributes, [key]: value } }
          : (() => {
              const updatedVariant = { ...v };
              delete updatedVariant.attributes[key];
              return updatedVariant;
            })()
        : v
    );
    setFormData({
      ...formData,
      variants: newVariants,
    });
  };

  const attr = Object.values(selectedCategory).some((i) => i)
    ? [
        ...categories[selectedCategory?.main]?.filters,
        ...categories[selectedCategory?.main]?.subs[selectedCategory?.sub]
          ?.filters,
        ...categories[selectedCategory?.main]?.subs[selectedCategory?.sub]
          ?.child[selectedCategory?.child].filters,
      ]
    : [];

  return (
    <View className="w-full flex-col gap-2">
      {variants?.map((variant) => {
        return (
          <View className="w-full border relative rounded-2xl p-2  border-gray-200 flex-col gap-2">
            <View className="text-sm text-gray-100  flex-row gap-1 flex-wrap">
              {attr.map((a, i) => {
                const { title, value } = a;
                return (
                  <CustomMultiSelect
                    triggerClassName="w-[120px] rounded-lg"
                    multiSelect={title === "color" ? false : true}
                    disabledValues={disabledValues.color}
                    data={a}
                    placeholder={translateAttributes(title)}
                    modalTitle={translateAttributes(title) + " seçin"}
                    key={title + Math.random()}
                    handleChange={(value: string[]) => {
                      handleChange(title, value, variant._id);
                    }}
                    defaultSelectValues={variant.attributes[title]}
                  />
                );
              })}
            </View>

            <ScrollView horizontal>
              {variant.images.map((image) => {
                return (
                  <View
                    className="w-[150px] h-[150px] rounded-2xl border-2 border-black-200 items-center mr-2 justify-center"
                    key={image._id}
                  >
                    <Image
                      source={{ uri: image.imageUrl }}
                      resizeMode="contain"
                      className="w-full h-full"
                    />
                  </View>
                );
              })}

              <TouchableOpacity
                onPress={() =>
                  openPicker((i: IProduct["image"][]) => {
                    setFormData({
                      ...formData,
                      variants: variants.map((v) =>
                        v._id === variant._id ? { ...v, images: i } : v
                      ),
                    });
                  }, "sub")
                }
                className="w-[150px] h-[150px] rounded-2xl border-2 border-black-200 items-center justify-center flex-col gap-2"
              >
                <Image
                  source={icons.upload}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Şəkillər seçin
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity
              className="top-1 absolute right-1 w-6"
              onPress={() =>
                Alert.alert(
                  "Bu çeşidi silmək istədiyinizdən əminsiniz?",
                  "Bu əməliyyatı geri qaytarmaq Mümkün olmayacaq",
                  [
                    {
                      text: "Xeyr",
                      style: "cancel",
                    },
                    {
                      text: "Bəli",
                      onPress: () => {
                        setFormData({
                          ...formData,
                          variants: variants.filter(
                            (v) => v._id !== variant._id
                          ),
                        });
                      },
                    },
                  ]
                )
              }
            >
              <MaterialCommunityIcons name="delete" size={20} color="orange" />
            </TouchableOpacity>
          </View>
        );
      })}
      <Text className="text-green-500">
        DİQQƏT! Çeşid əlavə edərkən hər çeşid üçün tələb olunan xüsusi sahələri
        doldurmaq tövsiyyə edilir. Əgər məhsul bir çeşiddən ibarətdirsə bu halda
        sadəcə şəkilləri əlavə edin və digər xanalara toxunmayın
      </Text>
      <TouchableOpacity
        onPress={() =>
          setFormData({
            ...formData,
            variants: [
              ...formData.variants,
              { images: [], attributes: {}, _id: generateUniqueId() },
            ],
          })
        }
      >
        <View className="w-full h-16 gap-2 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
          <FontAwesome5 name="plus-circle" size={20} color="orange" />
          <Text className="text-sm text-gray-100 font-pmedium ">
            Çeşid əlavə et
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VariantsSelector;
