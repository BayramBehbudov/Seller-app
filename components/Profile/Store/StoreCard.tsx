import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IStoreDB } from "@/types/interfaces";
import { getSlicedID } from "@/helpers/functions";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const StoreCard = ({ store }: { store: IStoreDB }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/store/${store._id}`)}
      style={styles.card}
      className="w-full rounded-3xl overflow-hidden mb-6"
    >
      <View className="pt-4 px-4 bg-blue-400/60 flex-col">
        <Text className="text-white text-2xl font-bold" numberOfLines={2}>
          {store.name}
        </Text>
        <Text className="text-gray-300 text-sm">
          ID: {getSlicedID(store._id)}
        </Text>
      </View>

      <View className="bg-white p-4">
        <Text className="text-gray-600 text-sm mb-3" numberOfLines={2}>
          {store.description}
        </Text>

        <View className="flex-row flex-wrap justify-between">
          <View className="flex-row items-center mb-2 w-1/2">
            <FontAwesome5 name="map-marker-alt" size={14} color="#4B5563" />
            <Text className="text-gray-600 text-xs ml-2" numberOfLines={1}>
              {store.point.name}
            </Text>
          </View>

          <View className="flex-row items-center mb-2 w-1/2">
            <FontAwesome5 name="box" size={14} color="#4B5563" />
            <Text className="text-gray-600 text-xs ml-2" numberOfLines={1}>
              {store.products?.length} məhsul
            </Text>
          </View>

          <View className="flex-row items-center mb-2 w-1/2">
            <FontAwesome5 name="phone" size={14} color="#4B5563" />
            <Text className="text-gray-600 text-xs ml-2" numberOfLines={1}>
              {store.phone}{" "}
            </Text>
          </View>

          <View className="flex-row items-center mb-2 w-1/2">
            <FontAwesome5 name="map-pin" size={14} color="#4B5563" />
            <Text className="text-gray-600 text-xs ml-2" numberOfLines={3}>
              {store.address}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-gray-100 p-3 flex-row justify-between items-center">
        <Text className="text-gray-500 text-sm">
          Yaradılıb: {new Date(store.createdAt).toLocaleDateString()}
        </Text>

        <View
          className={`px-3 py-1 rounded-full ${
            store.isAvailable ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <Text className="text-xs font-medium text-white">
            {store.isAvailable ? "Aktiv" : "Deaktiv"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default StoreCard;
