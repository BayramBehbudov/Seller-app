import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { IProductDB } from "@/types/interfaces";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";
import { getSlicedID } from "@/helpers/functions";

const ProductCard = ({ product }: { product: IProductDB }) => {
  const { setIsLoading, refetchUser } = useGlobalContext();

  const handleDelete = async (prodId: string) => {
    setIsLoading(true);
    await axios.delete(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${prodId}`
    );
    await refetchUser();
    setIsLoading(false);
  };

  const handleUpdate = async (prodId: string, isActive: boolean) => {
    setIsLoading(true);
    await axios.patch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${prodId}`,
      {
        isActive,
      }
    );
    await refetchUser();
    setIsLoading(false);
  };
  return (
    <TouchableOpacity
      className="w-full  rounded-lg bg-white p-2 flex-row justify-between"
      onPress={() => router.push(`/product/${product._id}`)}
      style={{ height: 180 }}
    >
      <View className="w-[48%] h-full ">
        <Image
          source={{ uri: product.images.main.imageUrl }}
          className="w-full h-full object-cover  rounded"
          resizeMode="cover"
        />
      </View>
      <View className="w-[48%]  h-full gap-1 flex-col justify-between">
        <View className="">
          <Text className="text-base  h-11 font-semibold line-clamp-2 w-full">
            {product.name}
          </Text>
          <Text className="text-gray-600 text-base h-[58px] line-clamp-3 w-full">
            {product.description}
          </Text>
          <Text className="text-gray-600 text-base font-psemibold h-5 line-clamp-1 w-full">
            {product.store.name}
          </Text>
          <View className="flex w-full flex-row justify-between items-center">
            <Text className="text-gray-600 w-[45%] text-base font-psemibold  h-5">
              {product.price} AZN
            </Text>
            <Text
              className="text-gray-600  text-base font-psemibold h-5"
              style={{ maxWidth: "45%" }}
            >
              #{getSlicedID(product._id)}
            </Text>
          </View>
        </View>
        <View className=" flex-row gap-1 ">
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                `${
                  product.isActive
                    ? "Deaktiv etmək istədiyinizə əminmisiniz?"
                    : "Aktiv etmək istədiyinizə əminmisiniz?"
                }`,
                `${
                  product.isActive
                    ? "Məhsul serverimizdə qalacaq, lakin müştərilər görməyəcək"
                    : "Müştərilər məhsulu görəcəklər"
                }`,
                [
                  {
                    text: "Xeyr",
                    style: "cancel",
                  },
                  {
                    text: "Bəli",
                    onPress: () => handleUpdate(product._id, !product.isActive),
                  },
                ]
              )
            }
            className={`${
              product.isActive ? "bg-green-500" : "bg-red-500"
            }  w-[80px] justify-center items-center  px-3 py-2  rounded-full`}
          >
            <Text className="text-white">
              {product.isActive ? "Aktiv" : "Deaktiv"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "Məhsulu silmək istədiyinə əminsən?",
                "Bu əməliyyatı geri qaytarmaq mümkün olmayacaq",
                [
                  {
                    text: "Xeyr",
                    style: "cancel",
                  },
                  {
                    text: "Bəli",
                    onPress: () => handleDelete(product._id),
                  },
                ]
              )
            }
            className={`bg-red-500 w-[80px] justify-center items-center  px-3 py-2  rounded-full`}
          >
            <Text className="text-white">Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
