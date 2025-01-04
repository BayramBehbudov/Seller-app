import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { IProductDB, IPromotionDB } from "@/types/interfaces";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomSelect from "../CustomSelect";
import ButtonsContainer from "./ButtonsContainer";
import axios from "axios";
import mongoose from "mongoose";
import {
  getDiscountSymbol,
  getPromoTypeColor,
  translatePromoType,
} from "@/helpers/functions";
import CustomButton from "../CustomButton";
import { router } from "expo-router";

const PromoContainer = ({ currentProduct }: { currentProduct: IProductDB }) => {
  const { promos, setIsLoading, refetchUser } = useGlobalContext();
  const [type, setType] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<IPromotionDB | undefined>(
    undefined
  );

  const resetPromo = () => {
    const p = promos.find((promo) => promo._id === currentProduct.promo);
    setCurrentPromo(p);
  };

  useEffect(() => {
    resetPromo();
  }, [promos, currentProduct.promo]);

  const submit = async () => {
    if (currentPromo?._id !== currentProduct.promo) {
      try {
        setIsLoading(true);
        await axios.patch(
          `https://express-bay-rho.vercel.app/api/products/${currentProduct._id}`,
          {
            promo: currentPromo
              ? new mongoose.Types.ObjectId(currentPromo._id)
              : null,
          }
        );
        await refetchUser();
        setType(false);
        Alert.alert("Məlumatlar dəyişdirildi");
      } catch (error) {
        Alert.alert(
          "Xəta",
          "Məhsul məlumatları dəyişdirilərkən xəta baş verdi"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View className="bg-white/5 rounded-3xl p-5 mt-4">
      <ButtonsContainer
        setType={setType}
        type={type}
        cancel={resetPromo}
        submit={() => {
          Alert.alert("Məhsulun aksiyasını dəyişdirmək istəyirsiniz?", "", [
            {
              text: "Xeyr",
              style: "cancel",
            },
            {
              text: "Bəli",
              onPress: () => submit(),
            },
          ]);
        }}
        submitDisabled={currentProduct.promo === currentPromo?._id}
      />

      <Text className="text-white text-xl font-bold mb-4">Aktiv aksiya</Text>

      {currentPromo ? (
        <View className="bg-white/10 rounded-xl p-4">
          <View className="mb-2">
            <View
              className={`self-start px-2 py-1 rounded-full mb-2  ${getPromoTypeColor(
                currentPromo.type
              )}`}
            >
              <Text className="text-xs font-medium text-white">
                {translatePromoType(currentPromo.type)}
              </Text>
            </View>
            <Text
              className="text-white text-lg font-semibold"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {currentPromo.name}
            </Text>
          </View>
          <Text
            className="text-gray-300 mb-3"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {currentPromo.description}
          </Text>
          <View className="flex-row flex-wrap items-center">
            <View className="flex-row items-center mr-4 mb-2">
              <FontAwesome5 name="tag" size={16} color="#10B981" />
              <Text className="text-white ml-2">
                {currentPromo.discountValue}
                {getDiscountSymbol(currentPromo.type)} endirim
              </Text>
            </View>
            {currentPromo.minCount > 0 && (
              <View className="flex-row items-center mb-2">
                <FontAwesome5
                  name="shopping-basket"
                  size={16}
                  color="#10B981"
                />
                <Text className="text-white ml-2">
                  Min. {currentPromo.minCount} ədəd
                </Text>
              </View>
            )}
          </View>

          {type && (
            <TouchableOpacity
              className={`w-full rounded-xl py-2 mt-5 bg-red-500`}
              onPress={() => {
                setCurrentPromo(undefined);
              }}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Bu aksiyanı çıxart
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : promos.length > 0 ? (
        <View className="bg-white/10 rounded-xl p-4 items-center justify-center">
          <Text className="text-gray-300 text-lg">Aktiv aksiya yoxdur</Text>

          <CustomSelect
            handleChange={(v) => {
              const p = promos.find((promo) => promo._id === v);
              if (p) {
                setType(true);
                setCurrentPromo(p);
              }
            }}
            data={promos.map((promo) => ({
              id: promo._id,
              title: promo.name,
            }))}
            containerStyles="w-full mt-4"
            modalTitle="Aksiya seçin"
            placeholder="Yenisini təyin edin"
          />
        </View>
      ) : (
        <View className="bg-white/10 rounded-xl p-4 items-center justify-center">
          <Text className="text-gray-300 text-lg">Mövcud aksiya tapılmadı</Text>
          <CustomButton
            handlePress={() => router.push("/promo/add")}
            title="Yeni aksiya yarat"
            height={12}
            containerStyles="mt-4 bg-[#10B981] w-full"
            titleStyles="text-white"
          />
        </View>
      )}
    </View>
  );
};

export default PromoContainer;
