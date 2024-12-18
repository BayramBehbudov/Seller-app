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
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";

const index = () => {
  const { id } = useLocalSearchParams();
  const { setIsLoading, promos, user, refetchUser } = useGlobalContext();

  const currentPromo = id === "add" ? null : promos.find((p) => p._id === id);

  const [selectedStore, setSelectedStore] = useState<IStoreDB>(
    (user.stores.find((s) => s._id === currentPromo?.creator) as IStoreDB) ||
      ({} as IStoreDB)
  );

  const [products, setProducts] = useState<string[]>(
    currentPromo
      ? user.stores
          .flatMap((s) => s.products)
          .filter((p) => p.promo === id)
          .map((p) => p._id)
      : []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(PromoSchema),
    defaultValues: {
      name: currentPromo?.name || "",
      description: currentPromo?.description || "",
      type: currentPromo?.type || "",
      discountValue:
        currentPromo?.type === "buyXgetY"
          ? 0
          : Number(currentPromo?.discountValue || 0),
      minCount:
        currentPromo?.type === "buyXgetY"
          ? 0
          : Number(currentPromo?.minCount || 0),
      buyXgetY:
        currentPromo?.type === "buyXgetY"
          ? `${currentPromo.minCount}x${
              currentPromo.minCount - currentPromo.discountValue
            }`
          : "",
      isActive: currentPromo?.isActive || false,
    },
  });

  const onSubmit = async (data: IPromotion & { buyXgetY: string }) => {
    if (data.isActive && products.length === 0)
      return Alert.alert("Ən azı bir məhsul seçilməlidir");

    if (id === "add") {
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

      try {
        setIsLoading(true);

        const res = await axios.post(
          "https://express-bay-rho.vercel.app/api/promo/",
          { promoValue, products }
        );

        if (res.status === 200) {
          reset();
          setSelectedStore({} as IStoreDB);
          setProducts([]);
          refetchUser();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!currentPromo) return;

      let newValue = {};
      Object.entries(data).forEach(([key, value]) => {
        if (
          currentPromo[key as keyof IPromotion] !== value &&
          (key === "name" || key === "description" || key === "isActive")
        ) {
          newValue = { ...newValue, [key]: value };
        }
      });

      const recentlyProds = user.stores
        .flatMap((s) => s.products)
        .filter((p) => p.promo === id)
        .map((p) => p._id);

      const deletedProds = recentlyProds.filter((p) => !products.includes(p));

      Alert.alert(
        "Diqqət!",
        "Əgər seçilən məhsullarda fərqli aksiya qüvvədədirsə o zaman həmin aksiya halhazırda təyin etdiyiniz aksiya ilə əvəz ediləcəkdir. Və dəyişdirilməyə qədər olan sifarişlərdə əvvəlki endirim şərtləri tətbiq ediləcəkdir",
        [
          {
            onPress: () => {},
            text: "Ləğv et",
            style: "cancel",
          },
          {
            text: "Davam et",
            style: "default",
            onPress: async () => {
              try {
                setIsLoading(true);

                if (deletedProds.length > 0) {
                  deletedProds.forEach(async (p) => {
                    await axios.patch(
                      `https://express-bay-rho.vercel.app/api/products/${p}`,
                      {
                        promo: null,
                      }
                    );
                  });
                }

                if (Object.values(newValue).length > 0 || products.length > 0) {
                  const res = await axios.patch(
                    `https://express-bay-rho.vercel.app/api/promo/${currentPromo._id}`,
                    { promoValue: newValue, products }
                  );
                  if (res.status === 200) {
                    refetchUser();
                  }
                }
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoading(false);
              }
            },
          },
        ]
      );
    }
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
          defaultType={currentPromo?.type || ""}
          disabled={id === "add" ? false : true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
