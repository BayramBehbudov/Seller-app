import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { IProductDB } from "@/types/interfaces";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalProvider";

const StatusContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  const { setIsLoading, refetchUser } = useGlobalContext();
  const { isActive, _id } = currentProduct;

  const handleDelete = async () => {
    setIsLoading(true);
    await axios.delete(
      `https://express-bay-rho.vercel.app/api/products/${_id}`
    );
    await refetchUser();
    setIsLoading(false);
  };

  const handleUpdate = async (isActive: boolean) => {
    setIsLoading(true);
    await axios.patch(
      `https://express-bay-rho.vercel.app/api/products/${_id}`,
      {
        isActive,
      }
    );
    await refetchUser();
    setIsLoading(false);
  };

  return (
    <View className="justify-between flex-row gap-1 mt-10 w-full">
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            `${
              isActive
                ? "Deaktiv etmək istədiyinizə əminmisiniz?"
                : "Aktiv etmək istədiyinizə əminmisiniz?"
            }`,
            `${
              isActive
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
                onPress: () => handleUpdate(!isActive),
              },
            ]
          )
        }
        className={`${
          !isActive ? "bg-green-500" : "bg-red-500"
        }  w-[48%] justify-center items-center  p-4 rounded-full`}
      >
        <Text className="text-white">{!isActive ? "Aktiv et" : "Deaktiv et"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Məhsulu silmək istədiyinə əminsən?",
            "Bu əməliyyatı geri qaytarmaq mümkün olmayacaq",
            [
              {
                text: "Ləğv et",
                style: "cancel",
              },
              {
                text: "Mən bu məhsulu silmək istəyirəm",
                onPress: () => handleDelete(),
              },
            ]
          );
        }}
        className={`bg-red-500 w-[48%] justify-center items-center  p-4 rounded-full`}
      >
        <Text className="text-white">Sil</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StatusContainer;
