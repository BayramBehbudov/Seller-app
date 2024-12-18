import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import PromoCard from "./PromoCard";
import { router } from "expo-router";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";

const Promos = () => {
  const { promos } = useGlobalContext();

  return (
    <FlatList
      data={promos}
      contentContainerClassName="gap-2 w-full"
      centerContent={true}
      contentContainerStyle={{ paddingBottom: 80 }}
      renderItem={({ item }) => <PromoCard promo={item} />}
      keyExtractor={(item) => item._id}
      ListFooterComponent={
        <TouchableOpacity
          style={{ backgroundColor: "#FAFAFA" }}
          className="w-full items-center justify-center  h-[200px]  rounded-2xl p-3 flex-col "
          onPress={() => router.push("/promo/add")}
        >
          <Image
            source={icons.add}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
          <Text className="text-xl  font-psemibold text-center mt-4">
            Yeni aksiya yarat
          </Text>
        </TouchableOpacity>
      }
    />
  );
};

export default Promos;
