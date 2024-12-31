import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { IProductDB } from "@/types/interfaces";
import { getSlicedID } from "@/helpers/functions";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const ProductCard = ({ product }: { product: IProductDB }) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-lg overflow-hidden mb-4 shadow-lg"
      onPress={() => router.push(`/product/${product._id}`)}
      activeOpacity={0.7}
    >
      <View className="relative h-[200px]">
        <Image
          source={{ uri: product.image.imageUrl }}
          className="w-full h-full"
        />
        <View className="absolute right-2 top-3 bg-green-500 rounded-xl py-1 px-3">
          <Text className="text-white text-center text-xl font-bold">
            {product.price} AZN
          </Text>
        </View>
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-bold text-gray-800" numberOfLines={1}>
            {product.name}
          </Text>
          <View
            style={{ backgroundColor: "#F3F4F6" }}
            className="flex-row items-center px-2 py-1 rounded-md"
          >
            <FontAwesome name="barcode" size={12} color="#6B7280" />
            <Text className="text-sm ml-2 text-gray-800">
              {getSlicedID(product._id)}
            </Text>
          </View>
        </View>
        <Text className="text-base text-gray-600 mb-3" numberOfLines={2}>
          {product.description}
        </Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <FontAwesome5 name="store" size={16} color="#f97316" />
            <Text className="text-base text-gray-800 ml-2" numberOfLines={1}>
              {product.store.name}
            </Text>
          </View>
          <Text
            className={`text-white px-4 py-1 rounded-full ${
              product.isActive ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {product.isActive ? "Aktiv" : "Deaktiv"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
