import { View, FlatList, Image, TouchableOpacity, Text } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import StoreCard from "./StoreCard";
import { router } from "expo-router";

const Stores = () => {
  const { user } = useGlobalContext();

  return (
    <View className="w-full h-full ">
      <FlatList
        data={user.stores}
        contentContainerClassName="gap-2"
        centerContent={true}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => <StoreCard store={item} />}
        keyExtractor={(item) => item._id}
        ListFooterComponent={
          <TouchableOpacity
            style={{ backgroundColor: "#FAFAFA" }}
            className="w-full items-center justify-center  h-[200px]  rounded-2xl p-3 flex-col "
            onPress={() => router.push("/store/add")}
          >
            <Image
              source={icons.add}
              style={{ width: 60, height: 60 }}
              resizeMode="contain"
            />
            <Text className="text-xl  font-psemibold text-center mt-4">
              Yeni mağaza əlavə et
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default Stores;
