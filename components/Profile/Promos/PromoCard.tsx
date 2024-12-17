import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IPromotionDB } from "@/types/interfaces";
import { router } from "expo-router";

const PromoCard = ({ promo }: { promo: IPromotionDB }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/promo/${promo._id}`)}
      style={{ backgroundColor: "#FAFAFA" }}
      className="w-full h-[200px] gap-1 rounded-2xl p-3 flex-col"
    >
      <Text className="text-red-500">{promo._id}</Text>
    </TouchableOpacity>
  );
};

export default PromoCard;
