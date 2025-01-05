import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { IOrderProductDb } from "@/types/interfaces";
import { router } from "expo-router";
import { translateAttributes } from "@/helpers/translateFilters";
import { getSlicedID } from "@/helpers/functions";

const OrderProductCard = ({
  prod,
  setModalVisible,
}: {
  prod: IOrderProductDb;
  setModalVisible: (value: boolean) => void;
}) => {
  const { product, count, selectedAttributes } = prod;

  const handlePress = () => {
    setModalVisible(false);
    router.push(`/product/${product._id}`);
  };

  const uri = selectedAttributes.color
    ? product.variants.find((v) =>
        v.attributes.color.includes(selectedAttributes.color)
      )?.images[0].imageUrl || product.image.imageUrl
    : product.image.imageUrl;

  return (
    <TouchableOpacity
      className="flex-row bg-white rounded-lg overflow-hidden mt-2 mb-2 shadow-lg"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View className="relative h-[120px] w-[120px]">
        <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
        <View style={styles.countBadge}>
          <Text className="text-white text-sm">{count} ədəd</Text>
        </View>
      </View>
      <View className="justify-between p-2">
        <Text
          className="text-lg font-bold mb-1 text-[#1F2937]"
          numberOfLines={2}
        >
          {product.name}
        </Text>
        <Text className="text-[14px] text-[#6B7280] mb-2">
          {getSlicedID(product._id)}
        </Text>
        <View className="flex-col">
          {Object.entries(selectedAttributes).map(([key, value], index) => (
            <Text
              key={index}
              className="text-[14px] text-[#6B7280] mb-1"
              numberOfLines={1}
            >
              {translateAttributes(key)}: {value}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  countBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#3B82F6",
    borderBottomLeftRadius: 8,
    padding: 4,
  },
});

export default OrderProductCard;
