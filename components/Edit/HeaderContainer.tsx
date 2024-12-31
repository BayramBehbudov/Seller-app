import { View, Text } from "react-native";
import React from "react";
import { IProductDB } from "@/types/interfaces";
import { categories } from "@/static/categories";
import { getSlicedID } from "@/helpers/functions";
import { formatterDate } from "@/helpers/dateHelpers";

const HeaderContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  return (
    <View className="w-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl overflow-hidden">
      <View className="bg-white/20 p-4 border-b border-white/10">
        <Text className="text-white/80 text-sm font-medium">
          {categories[currentProduct.category.main].title} {" > "}
          {
            categories[currentProduct.category.main].subs[
              currentProduct.category.sub
            ].title
          }
          {" > "}
          {
            categories[currentProduct.category.main].subs[
              currentProduct.category.sub
            ].child[currentProduct.category.child].title
          }
        </Text>
      </View>

      <View className="p-5 space-y-4">
        <View className="flex-row justify-between items-center">
          <View className="bg-white/10 px-4 py-2 rounded-lg">
            <Text className="text-gray-400 text-xs mb-1">Məhsul ID</Text>
            <Text className="text-white font-medium">
              {getSlicedID(currentProduct._id)}
            </Text>
          </View>

          <View className="bg-white/10 px-4 py-2 rounded-lg">
            <Text className="text-gray-400 text-xs mb-1">Yaradılma tarixi</Text>
            <Text className="text-white font-medium">
              {formatterDate(currentProduct.createdAt)}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-1 mr-3">
            <Text className="text-gray-400 text-xs mb-2">Status</Text>
            <View
              className={`rounded-lg py-2 px-4 ${
                currentProduct.isActive ? "bg-green-500/30" : "bg-red-500/30"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  currentProduct.isActive ? "text-green-400" : "text-red-400"
                }`}
              >
                {currentProduct.isActive ? "Aktiv" : "Deaktiv"}
              </Text>
            </View>
          </View>

          <View className="flex-1">
            <Text className="text-gray-400 text-xs mb-2">Baxış sayı</Text>
            <View className="bg-blue-500/20 rounded-lg py-2 px-4">
              <Text className="text-blue-400 text-center font-semibold">
                {currentProduct.viewed}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HeaderContainer;
