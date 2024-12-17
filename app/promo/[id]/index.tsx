import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import GoBackIcon from "@/components/GoBackIcon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PromoSchema } from "@/settings/schemes";
import { IPromotion, IStoreDB } from "@/types/interfaces";
import PromoControllers from "@/components/Promotion/PromoControllers";

const index = () => {
  const { id } = useLocalSearchParams();
  const [selectedStore, setSelectedStore] = useState({} as IStoreDB);
  const [products, setProducts] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(PromoSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "",
      discountValue: 0,
      minCount: 0,
      buyXgetY: "",
      isActive: false,
    },
  });

  const onSubmit = (data: IPromotion & { buyXgetY: string }) => {
    if (data.isActive && products.length === 0)
      return Alert.alert("Ən azı bir məhsul seçilməlidir");

    const promoValue: IPromotion & { creator: string } = {
      name: data.name,
      description: data.description,
      type: data.type,
      isActive: data.isActive,
      discountValue: data.discountValue,
      minCount: data.minCount,
      creator: selectedStore._id,
    };

    if (data.type === "buyXgetY") {
      promoValue.minCount = +data.buyXgetY.split("x")[0];
      promoValue.discountValue =
        +data.buyXgetY.split("x")[0] - +data.buyXgetY.split("x")[1];
    }

    console.log(promoValue, products);
  };
  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <ScrollView className="w-full">
        <View className="flex flex-row items-center mb-5 gap-4">
          <GoBackIcon iconColor="white" size={20} />
          <Text className="text-white text-2xl font-bold text-center ">
            Aksiya məlumatları
          </Text>
        </View>
        <PromoControllers
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          control={control}
          setValue={setValue}
          errors={errors}
          setProducts={setProducts}
          selectedProducts={products}
          submit={handleSubmit(onSubmit)}
          type={id === "add" ? "add" : "edit"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
