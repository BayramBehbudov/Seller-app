import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { IProductDB, IProductVariant } from "@/types/interfaces";
import { categories } from "@/static/categories";
import { translateAttributes } from "@/helpers/translateFilters";
import CustomMultiSelect from "../CustomMultiSelect";

const AttributContainer = ({
  category,
  variant,
  variants,
  setVariants,
  type,
}: {
  category: IProductDB["category"];
  variant: IProductVariant;
  variants: IProductVariant[];
  setVariants: React.Dispatch<React.SetStateAction<IProductVariant[]>>;
  type: boolean;
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

  const attr = [
    ...categories[category.main].filters,
    ...categories[category.main].subs[category.sub].filters,
    ...categories[category.main].subs[category.sub].child[category.child]
      .filters,
  ];

  const handleChange = (key: string, value: string[], variantId: string) => {
    const newVariants = variants.map((v) =>
      v._id === variantId
        ? value.length > 0
          ? { ...v, attributes: { ...v.attributes, [key]: value } }
          : (() => {
              if (key !== "color") {
                const updatedVariant = { ...v };
                delete updatedVariant.attributes[key];
                return updatedVariant;
              } else {
                return v;
              }
            })()
        : v
    );
    setVariants(newVariants);
  };
  return (
    <View className="mt-4 flex-col gap-2">
      {attr.map((a, i) => {
        const { title, value } = a;
        return (
          <View className="flex-row items-center" key={title + Math.random()}>
            <Text
              className="text-white font-semibold"
              style={{ minWidth: 50, maxWidth: 130 }}
              numberOfLines={1}
            >
              {translateAttributes(title)}
            </Text>
            {!type ? (
              <View
                className={`border-2 h-12 py-3 px-2  bg-black-100  border-black-200 w-[120px] rounded-lg`}
              >
                <Text
                  className="text-base text-gray-100 font-pmedium"
                  numberOfLines={1}
                >
                  {variant.attributes[title]
                    ? variant.attributes[title].map((item) => item).join(", ")
                    : "Seçilməyib"}
                </Text>
              </View>
            ) : (
              <CustomMultiSelect
                triggerClassName="w-[120px] rounded-lg"
                multiSelect={title === "color" ? false : true}
                disabledValues={disabledValues.color}
                data={a}
                placeholder={"Seçilməyib"}
                modalTitle={translateAttributes(title) + " seçin"}
                key={title + Math.random()}
                handleChange={(value: string[]) => {
                  handleChange(title, value, variant._id);
                }}
                defaultSelectValues={variant.attributes[title]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default AttributContainer;
