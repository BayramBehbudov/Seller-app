import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { IProductDB } from "@/types/interfaces";
import ButtonsContainer from "./ButtonsContainer";
import { categories } from "@/static/categories";
import { translateFeatures } from "@/helpers/translateFeatures";
import CustomMultiSelect from "../CustomMultiSelect";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";

const FeaturesContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  const { category } = currentProduct;
  const [type, setType] = useState(false);

  const [features, setFeatures] = useState(
    JSON.parse(JSON.stringify(currentProduct.features))
  );

  const { setIsLoading, refetchUser } = useGlobalContext();
  const featuresList = [
    ...categories[category.main].features,
    ...categories[category.main].subs[category.sub].features,
    ...categories[category.main].subs[category.sub].child[category.child]
      .features,
  ];

  const submit = async () => {
    const hasChanges = findChanged();
    if (hasChanges) {
      try {
        setIsLoading(true);
        await axios.patch(
          `https://express-bay-rho.vercel.app/api/products/${currentProduct._id}`,
          { features }
        );
        await refetchUser();
        setType(false);
        Alert.alert("Məhsulun xüsusiyyətləri dəyişdirildi");
      } catch (error) {
        Alert.alert(
          "Xəta",
          "Məhsul məlumatları dəyişdirilərkən xəta baş verdi"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  const findChanged = () => {
    const oldFeatures = currentProduct.features;
    const hasChanges =
      Object.keys(features).some(
        (key) => !oldFeatures[key] || features[key] !== oldFeatures[key]
      ) || Object.keys(oldFeatures).some((key) => !features[key]);

    return hasChanges;
  };

  return (
    <View className="bg-white/5 rounded-3xl p-5 gap-3 flex-col mt-4">
      <ButtonsContainer
        setType={setType}
        type={type}
        cancel={() => {
          setFeatures(JSON.parse(JSON.stringify(currentProduct.features)));
        }}
        submit={() => {
          Alert.alert("Məhsul xüsusiyyətlərini dəyişdirmək istəyirsiniz?", "", [
            {
              text: "Xeyr",
              style: "cancel",
            },
            {
              text: "Bəli",
              onPress: () => submit(),
            },
          ]);
        }}
        submitDisabled={!findChanged()}
      />
      <Text className="text-white text-xl font-bold mb-2 ">Xüsusiyyətlər</Text>

      {featuresList.map((f, i) => {
        const { title, value } = f;
        return (
          <View className="flex-row items-center" key={f.title + i}>
            <Text
              className="text-white font-semibold"
              style={{ width: 130 }}
              numberOfLines={1}
            >
              {translateFeatures(title)}
            </Text>

            {!type ? (
              <View
                className={`border-2 h-12 py-3 px-2  bg-black-100 rounded-2xl  border-black-200  w-[150px] mt-2 `}
              >
                <Text
                  className="text-base text-gray-100 font-pmedium"
                  numberOfLines={1}
                >
                  {features[title] || "Seçilməyib"}
                </Text>
              </View>
            ) : (
              <CustomMultiSelect
                data={{ title, value }}
                modalTitle={translateFeatures(title) + " seçin"}
                handleChange={(value: string[]) => {
                  let newFeatures = { ...features };
                  if (features[title]) {
                    delete newFeatures[title];
                  } else {
                    newFeatures = {
                      ...features,
                      [title]: value[0],
                    };
                  }
                  setFeatures(newFeatures);
                }}
                defaultSelectValues={[features[title]]}
                triggerClassName="mt-2 w-[150px]"
                placeholder="Seçilməyib"
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default FeaturesContainer;
