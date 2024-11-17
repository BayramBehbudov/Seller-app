import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IStoreDB } from "@/types/interfaces";
import { getSlicedID } from "@/helpers/functions";
import { router } from "expo-router";

const StoreCard = ({ store }: { store: IStoreDB }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/store/${store._id}`)}
      style={{ backgroundColor: "#FAFAFA" }}
      className="w-full h-[200px] gap-1 rounded-2xl p-3 flex-col"
    >
      <Text className="text-xl font-psemibold text-center line-clamp-1  h-6">
        {store.name}
      </Text>

      <Text className="text-base line-clamp-2  h-11 ">{store.description}</Text>
      <View className="mt-4 flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          ID:
        </Text>
        <Text className="text-base line-clamp-1">
          {getSlicedID(store._id).toUpperCase()}
        </Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Təyinat nöqtəsi:
        </Text>
        <Text className="text-base line-clamp-1">{store.point.name}</Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Məhsul sayı:
        </Text>
        <Text className="text-base line-clamp-1">{store.products?.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;
