import { View, Text } from "react-native";
import React from "react";
import { IOrderProduct } from "@/types/interfaces";
import { translateFilters } from "@/helpers/translateFilters";
import { getSlicedID } from "@/helpers/functions";

const OrderProductCard = ({ product }: { product: IOrderProduct }) => {
  return (
    <View className="w-full border border-gray-200 rounded-lg p-3 flex-col gap-2">
      <Text className="line-clamp-2  font-semibold w-full  h-10">
        {product.name}
      </Text>
      <View className="flex-row">
        <Text className="flex-1">Məhsul ID</Text>
        <Text className="flex-1 uppercase">{getSlicedID(product.$id)}</Text>
      </View>
      <View className="flex-row">
        <Text className=" flex-1">Say</Text>
        <Text className=" flex-1">{product.count}</Text>
      </View>
      <View>
        {Object.entries(product.selectedAtributes).map(([key, value]) => (
          <View className="flex-row" key={key}>
            <Text className=" flex-1">{translateFilters(key)}</Text>
            <Text className=" flex-1">{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderProductCard;
