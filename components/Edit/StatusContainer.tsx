import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { IProductDB } from "@/types/interfaces";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome5 } from "@expo/vector-icons";

const StatusContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  const { setIsLoading, refetchUser } = useGlobalContext();
  const { isActive, _id } = currentProduct;
  const [type, setType] = useState(false);

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
    <View className="bg-white/5 rounded-3xl p-5 flex-col  gap-1  mt-14 ">
      <TouchableOpacity
        onPress={() => {
          setType(!type);
        }}
        className="absolute top-3 right-4 flex-row gap-5  items-center justify-center z-10"
      >
        <FontAwesome5
          name={type ? "times" : "pen"}
          size={type ? 25 : 20}
          color="#9ca3af"
        />
      </TouchableOpacity>

      <Text className="text-white/80 text-xl font-medium">Diqqət!</Text>

      <Text className="text-white/80 text-base font-medium mb-12">
        Bu əməliyyatlar ilə məhsulu serverlərimizdən silə və ya deaktiv edə
        bilərsiniz
      </Text>
      <View className="justify-between flex-row  w-full">
        <TouchableOpacity
          disabled={!type}
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
            !type ? "bg-gray-500" : !isActive ? "bg-green-500" : "bg-red-500"
          }  w-[48%] justify-center items-center  p-4 rounded-full`}
        >
          <Text className="text-white">
            {!isActive ? "Aktiv et" : "Deaktiv et"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={!type}
          onPress={() => {
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
                  onPress: () => handleDelete(),
                },
              ]
            );
          }}
          className={`${
            type ? "bg-red-500" : "bg-gray-500"
          } w-[48%] justify-center items-center  p-4 rounded-full`}
        >
          <Text className="text-white">Sil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StatusContainer;
