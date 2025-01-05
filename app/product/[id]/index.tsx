import { ScrollView, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IProductDB } from "@/types/interfaces";
import HeaderContainer from "@/components/Edit/HeaderContainer";
import DetailContainer from "@/components/Edit/DetailContainer";
import EditMainImage from "@/components/Edit/EditMainImage";
import VariantsContainer from "@/components/Edit/VariantsContainer";
import FeaturesContainer from "@/components/Edit/FeaturesContainer";
import StatusContainer from "@/components/Edit/StatusContainer";
import PromoContainer from "@/components/Edit/PromoContainer";
import GoBackIcon from "@/components/GoBackIcon";

const index = () => {
  const { id } = useLocalSearchParams();

  const { user } = useGlobalContext();

  const currentProduct = user.stores
    ?.flatMap((store) => store.products)
    .find((product: IProductDB) => product._id === id);

  if (!currentProduct)
    return (
      <SafeAreaView className="bg-primary w-full h-full">
        <Text className="text-white text-2xl font-bold text-center">
          Belə bir məhsul tapılmadı
        </Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView className="bg-primary w-full h-full p-4">
      <GoBackIcon
        iconColor="white"
        size={26}
        text="Məhsul Məlumatları"
        textClassName="text-white text-2xl font-bold text-center ml-2"
        className="mb-4"
      />

      <ScrollView>
        <HeaderContainer currentProduct={currentProduct} />
        <DetailContainer currentProduct={currentProduct} />
        <EditMainImage currentProduct={currentProduct} />
        <VariantsContainer currentProduct={currentProduct} />
        <FeaturesContainer currentProduct={currentProduct} />
        <PromoContainer currentProduct={currentProduct} />
        <StatusContainer currentProduct={currentProduct} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
