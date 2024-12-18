import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { IPromotionDB } from "@/types/interfaces";
import { router } from "expo-router";
import { getSlicedID, translatePromoType } from "@/helpers/functions";
import { useGlobalContext } from "@/context/GlobalProvider";

const PromoCard = ({ promo }: { promo: IPromotionDB }) => {
  const { user } = useGlobalContext();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/promo/${promo._id}`)}
      style={{ backgroundColor: "#FAFAFA" }}
      className="w-full  gap-1 rounded-2xl p-3 flex-col"
    >
      <Text className="text-xl font-psemibold text-center line-clamp-1  h-6">
        {promo.name}
      </Text>

      <Text className="text-base line-clamp-2  h-11 ">{promo.description}</Text>
      <View className="mt-1 flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          ID:
        </Text>
        <Text className="text-base line-clamp-1">{getSlicedID(promo._id)}</Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Mağaza
        </Text>
        <Text className="text-base line-clamp-1">
          {user.stores.find((s) => s._id === promo.creator)?.name ||
            "Mağaza tapılmadı"}
        </Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Aksiya növü:
        </Text>
        <Text className="text-base line-clamp-1">
          {translatePromoType(promo.type)}
        </Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Aksiya Şərti:
        </Text>
        <Text className="text-base line-clamp-1">
          {promo.type === "buyXgetY" &&
            `${promo.minCount} al ${promo.minCount - promo.discountValue} ödə`}
          {promo.type === "percentage" && `${promo.discountValue}% endirim`}
          {promo.type === "countPercentage" &&
            `${promo.minCount} ədəd alışda ${promo.discountValue}% endirim`}
        </Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Status:
        </Text>
        <Text className="text-base line-clamp-1">
          {promo.isActive ? "Aktiv" : "Passiv"}
        </Text>
      </View>
      <View className="flex-row ">
        <Text className="text-base line-clamp-1" style={{ width: 100 }}>
          Məhsul sayı:
        </Text>
        <Text className="text-base line-clamp-1">
          {
            user.stores
              .flatMap((s) => s.products)
              .filter((p) => p.promo === promo._id).length
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PromoCard;
