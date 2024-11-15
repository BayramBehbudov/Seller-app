import { View, Text } from "react-native";
import React from "react";
import {
  ICategorieFilters,
  IFeatures,
  IFilterSelectorProps,
} from "@/types/interfaces";
import { translateFeatures } from "@/helpers/translateFeatures";
import CustomMultiSelect from "./CustomMultiSelect";

const FilterSelector = ({
  selectedCategory,
  features,
  filters,
  setFilters,
  setFeatures,
}: IFilterSelectorProps) => {
  const renderFilterItem = ({
    selectedCategoryFilters: { title, value },
  }: {
    selectedCategoryFilters: ICategorieFilters;
  }) => {
    return title !== "color" ? (
      <CustomMultiSelect
        title={title === "size" ? "Ölçü" : title}
        data={{ title, value }}
        modalTitle={"Seçin"}
        defaultSelectValues={
          filters.filter((item) => item.title === title)[0]?.value || []
        }
        handleChange={(value: string[]) => {
          if (value.length) {
            const updatedFilters = filters.filter(
              (item) => item.title !== title
            );
            setFilters([...updatedFilters, { title, value }]);
          }
        }}
        multiSelect={true}
        containerStyles="mb-4 mt-4"
        placeholder="Seçilməyib"
      />
    ) : (
      <></>
    );
  };

  const renderFeatureItem = ({
    selectedCategoryFeautures: { title, value },
  }: {
    selectedCategoryFeautures: IFeatures;
  }) => {
    const defaultFeature = features.find((item) => item.title === title);
    return (
      <CustomMultiSelect
        title={translateFeatures(title)}
        data={{ title, value }}
        defaultSelectValues={defaultFeature ? [defaultFeature.value] : []}
        modalTitle={translateFeatures(title) + " seçin"}
        handleChange={(value: string[]) => {
          const changed = features.some((i) => i.title === title);
          if (changed) {
            const updatedFeatures = features.map((i) =>
              i.title !== title ? i : { title, value: value[0] }
            );
            setFeatures(updatedFeatures);
          } else {
            setFeatures([...features, { title, value: value[0] }]);
          }
        }}
        containerStyles="mb-4 mt-4"
        placeholder="Seçilməyib"
      />
    );
  };

  const getFlatList = (
    list: { title: string; value: string[] }[],
    type: "filter" | "feature"
  ) => {
    return (
      <View>
        {list.map((listItem) => {
          return (
            <View key={listItem.title}>
              {type === "feature"
                ? renderFeatureItem({ selectedCategoryFeautures: listItem })
                : renderFilterItem({ selectedCategoryFilters: listItem })}
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
            <View key={item.id}>{getFlatList(item.filters, "filter")}</View>
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
