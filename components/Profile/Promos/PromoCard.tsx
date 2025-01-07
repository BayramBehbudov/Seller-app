import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IPromotionDB } from "@/types/interfaces";
import { router } from "expo-router";
import {
  getPromoIcon,
  getSlicedID,
  translatePromoType,
} from "@/helpers/functions";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const PromoCard = ({ promo }: { promo: IPromotionDB }) => {
  const { user } = useGlobalContext();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/promo/${promo._id}`)}
      className={`w-full rounded-2xl overflow-hidden bg-${
        promo.type === "percentage"
          ? "green"
          : promo.type === "buyXgetY"
          ? "purple"
          : promo.type === "countPercentage"
          ? "blue"
          : "sky"
      }-500 mb-4 `}
      style={styles.cardShadow}
    >
      <View className="bg-white/10 p-2">
        <View className="flex-row justify-between items-center">
          <View className="flex-row bg-white/20 items-center px-2 py-1 rounded-md">
            <Text className="text-sm text-white mr-2">ID:</Text>
            <Text className="text-sm text-white">{getSlicedID(promo._id)}</Text>
          </View>
          <View
            className={`px-2 py-1 rounded-full ${
              promo.isActive ? "bg-green-400" : "bg-red-400"
            }`}
          >
            <Text className="text-xs font-medium text-white">
              {promo.isActive ? "Aktiv" : "Passiv"}
            </Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <FontAwesome5
            name={getPromoIcon(promo.type)}
            size={18}
            color="white"
          />
          <Text
            className="text-white text-lg font-bold ml-2 flex-1"
            numberOfLines={1}
          >
            {promo.name}
          </Text>
        </View>
        <Text className="text-white text-sm mb-3" numberOfLines={2}>
          {promo.description}
        </Text>
        <View className="bg-white/20 rounded-lg p-3">
          <View className="flex-row justify-between mb-1">
            <Text className="text-white text-sm">Aksiya növü:</Text>
            <Text className="text-white text-sm font-semibold">
              {translatePromoType(promo.type)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-white text-sm">Aksiya Şərti:</Text>
            <Text className="text-white text-sm font-semibold">
              {promo.type === "buyXgetY" &&
                `${promo.minCount} al ${
                  promo.minCount - promo.discountValue
                } ödə`}
              {promo.type === "percentage" && `${promo.discountValue}% endirim`}
              {promo.type === "countPercentage" &&
                `${promo.minCount} ədəd alışda ${promo.discountValue}% endirim`}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-white text-sm">Məhsul sayı:</Text>
            <Text className="text-white text-sm font-semibold">
              {
                user.stores
                  .flatMap((s) => s.products)
                  .filter((p) => p.promo === promo._id).length
              }
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white/10 p-2">
        <View className="flex-row items-center bg-white/20 px-3 py-1 rounded-lg">
          <FontAwesome5 name="store" size={14} color="#f97316" />
          <Text className="text-white text-sm ml-2 flex-1" numberOfLines={1}>
            {user.stores.find((s) => s._id === promo.creator)?.name ||
              "Mağaza tapılmadı"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PromoCard;
