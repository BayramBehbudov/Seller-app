import { View, Text } from "react-native";
import React from "react";
import { translateAttributes } from "@/helpers/translateFilters";
import { getSlicedID } from "@/helpers/functions";
import { IOrderProductDb } from "@/types/interfaces";
import { useGlobalContext } from "@/context/GlobalProvider";

const OrderProductCard = ({ prod }: { prod: IOrderProductDb }) => {
  const { product, count, selectedAttributes } = prod;
  const { user } = useGlobalContext();
  const store = user.stores.find((store) => store._id === product.store);
  return (
    <View className="w-full border border-gray-200 rounded-lg p-3 flex-col gap-2">
      <Text className="line-clamp-2  font-semibold w-full  h-10">
        {product.name}
      </Text>
      <View className="flex-row">
        <Text className="flex-1">Məhsul ID</Text>
        <Text className="flex-1 uppercase">{getSlicedID(product._id)}</Text>
      </View>
      <View className="flex-row">
        <Text className=" flex-1">Say</Text>
        <Text className=" flex-1">{count}</Text>
      </View>
      <View>
        {Object.entries(selectedAttributes).map(([key, value]) => (
          <View className="flex-row" key={key}>
            <Text className=" flex-1">{translateAttributes(key)}</Text>
            <Text className=" flex-1">{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default OrderProductCard;
