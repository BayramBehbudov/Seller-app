import { View, Text } from "react-native";
import React from "react";
import {
  ICategorieFilters,
  IFeatures,
  IFilterSelectorProps,
} from "@/types/interfaces";
import { translateFeatures } from "@/helpers/translateFeatures";
import CustomMultiSelect from "@/components/CustomMultiSelect";

const FilterSelector = ({
  selectedCategory,
  features,
  attributes,
  setAttributes,
  setFeatures,
}: IFilterSelectorProps) => {
  const renderAttributeItem = ({
    selectedCategoryFilters: { title, value },
  }: {
    selectedCategoryFilters: ICategorieFilters;
  }) => {
    return title !== "color" ? (
      <CustomMultiSelect
        // title={title === "size" ? "Ölçü" : title}
        data={{ title, value }}
        modalTitle={"Seçin"}
        defaultSelectValues={attributes[title] ? attributes[title] : []}
        handleChange={(value: string[]) => {
          if (value.length > 0) {
            setAttributes({
              ...attributes,
              [title]: value,
            });
          }
        }}
        multiSelect={true}
        triggerClassName="mb-4 mt-4"
        placeholder="Seçilməyib"
      />
    ) : (
      <></>
    );
  };

  const renderFeaturesItem = ({
    selectedCategoryFeautures: { title, value },
  }: {
    selectedCategoryFeautures: IFeatures;
  }) => {
    return (
      <CustomMultiSelect
        // title={translateFeatures(title)}
        data={{ title, value }}
        defaultSelectValues={features ? [features[title]] : []}
        modalTitle={translateFeatures(title) + " seçin"}
        handleChange={(value: string[]) => {
          setFeatures({
            ...features,
            [title]: value[0],
          });
        }}
        triggerClassName="mb-4 mt-4"
        placeholder="Seçilməyib"
      />
    );
  };

  const getFlatList = (
    list: { title: string; value: string[] }[],
    type: "attributes" | "feature"
  ) => {
    return (
      <View>
        {list.map((listItem) => {
          return (
            <View key={listItem.title}>
              {type === "feature"
                ? renderFeaturesItem({ selectedCategoryFeautures: listItem })
                : renderAttributeItem({ selectedCategoryFilters: listItem })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <View>
        <Text className="text-white text-2xl w-full ">Filterlər</Text>
        {Object.values(selectedCategory).map((item) => {
          return (
            <View key={item.id}>{getFlatList(item.filters, "attributes")}</View>
          );
        })}
      </View>

      <View>
        <Text className="text-white text-2xl w-full ">Xüsusiyyətlər</Text>

        {Object.values(selectedCategory).map((item) => {
          return (
            <View key={item.id}>{getFlatList(item.features, "feature")}</View>
          );
        })}
      </View>
    </>
  );
};

export default FilterSelector;
