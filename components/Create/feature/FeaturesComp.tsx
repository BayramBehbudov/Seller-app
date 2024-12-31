import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { IFeatures, IProduct } from "@/types/interfaces";
import { translateFeatures } from "@/helpers/translateFeatures";
import CustomMultiSelect from "@/components/CustomMultiSelect";
import { categories } from "@/static/categories";
import CustomButton from "@/components/CustomButton";

const FeaturesComp = ({
  selectedCategory,
  formData,
  setFormData,
  submit,
}: {
  selectedCategory: IProduct["category"];
  formData: IProduct & { store: string };
  setFormData: React.Dispatch<
    React.SetStateAction<IProduct & { store: string }>
  >;
  submit: () => void;
}) => {
  const [features, setFeatures] = useState<IFeatures[]>([]);
  useEffect(() => {
    const allFeatures = [
      ...categories[selectedCategory.main]?.features,
      ...categories[selectedCategory.main]?.subs[selectedCategory.sub]
        ?.features,
      ...categories[selectedCategory.main]?.subs[selectedCategory.sub]?.child[
        selectedCategory.child
      ]?.features,
    ];
    setFeatures(allFeatures);
  }, [selectedCategory]);

  return (
    <ScrollView>
      {features.length > 0 &&
        features.map((feature: IFeatures) => {
          const { title, value } = feature;
          return (
            <View className="flex-row items-center" key={title}>
              <Text className="text-white  w-[130px]">
                {translateFeatures(title)}
              </Text>
              <CustomMultiSelect
                data={{ title, value }}
                modalTitle={translateFeatures(title) + " seçin"}
                handleChange={(value: string[]) => {
                  let newFeatures = { ...formData.features };
                  if (formData.features[title]) {
                    delete newFeatures[title];
                  } else {
                    newFeatures = {
                      ...formData.features,
                      [title]: value[0],
                    };
                  }

                  setFormData({
                    ...formData,
                    features: newFeatures,
                  });
                }}
                defaultSelectValues={
                  formData.features[title] ? [formData.features[title]] : []
                }
                triggerClassName="mt-4 w-[150px]"
                placeholder="Seçilməyib"
              />
            </View>
          );
        })}
      <CustomButton
        handlePress={() => {
          Alert.alert(
            "Məhsulu əlavə etmək istəyirsiniz?",
            "Öncə daxil etdiyiniz məlumatları yoxlamağınız tövsiyyə edilir",
            [
              {
                text: "Xeyr",
                style: "cancel",
              },
              {
                text: "Bəli",
                onPress: () => submit(),
              },
            ]
          );
        }}
        title="Təsdiqlə"
        containerStyles="w-full mt-5"
      />
    </ScrollView>
  );
};

export default FeaturesComp;
