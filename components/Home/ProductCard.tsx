import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { IProduct, IProductDB } from "@/types/interfaces";
import { router } from "expo-router";
import { getImageUrl } from "@/services/imageUploader";

const ProductCard = ({
  product,
  handleDelete,
  handleUpdate,
}: {
  product: IProductDB;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, isActive: boolean) => void;
}) => {
  return (
    <TouchableOpacity
      className="w-full h-48 rounded-lg bg-white p-2 flex-row justify-between"
      onPress={() => router.push(`/edit/${product._id}`)}
    >
      <View className="w-[48%] h-full">
        <Image
          source={{ uri: product.images.main.url }}
          className="w-full h-full object-cover  rounded"
          resizeMode="cover"
        />
      </View>
      <View className="w-[48%] h-full gap-1 flex-col justify-between">
        <View className="">
          <Text className="text-base h-11 font-semibold line-clamp-2 w-full">
            {product.name}
          </Text>
          <Text className="text-gray-600 text-base h-[58px] line-clamp-3 w-full">
            {product.description}
          </Text>
          <Text className="text-gray-600 text-base h-5 line-clamp-1 w-full">
            {product.store.name}
          </Text>
          <Text className="text-gray-600 font-psemibold  h-5">
            {product.price} AZN
          </Text>
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
