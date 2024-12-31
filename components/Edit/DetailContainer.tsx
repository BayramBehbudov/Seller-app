import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { IProductDB } from "@/types/interfaces";
import { FontAwesome5 } from "@expo/vector-icons";
import FormField from "../FormField";
import CustomSelect from "../CustomSelect";
import { useGlobalContext } from "@/context/GlobalProvider";
import CustomButton from "../CustomButton";
import axios from "axios";
import ButtonsContainer from "./ButtonsContainer";

const DetailContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  const [type, setType] = useState(false);
  const { user, setIsLoading, refetchUser } = useGlobalContext();
  const [form, setForm] = useState({
    name: currentProduct.name,
    price: currentProduct.price.toString(),
    description: currentProduct.description,
    store: currentProduct.store._id,
  });

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    store: "",
  });

  useEffect(() => {
    setErrors({
      name:
        form.name.toString().trim().length < 5
          ? "Məhsulun adını daxil edin, minimum 5 simvol"
          : "",
      price: !/^[1-9][0-9]*(\.[0-9]{1,2})?$/.test(form.price)
        ? "Məhsulun qiymətini düzgün daxil edin. məs. 9, 10.99, 155.6"
        : "",
      description:
        form.description.toString().trim().length < 10
          ? "Məhsulun haqqında məlumat daxil edin, minimum 10 simvol"
          : "",
      store: user.stores.some((s) => s._id === form.store)
        ? ""
        : "Mağaza seçilməlidir",
    });
  }, [form]);

  const update = async () => {
    if (Object.values(errors).every((e) => e === "")) {
      let newData = {};

      Object.entries(form).forEach(([key, value]) => {
        if (key === "store") {
          currentProduct.store._id !== value &&
            (newData = { ...newData, store: value });
        } else if (key === "price") {
          currentProduct.price.toString() !== value &&
            (newData = { ...newData, price: value });
        } else if (key === "name") {
          currentProduct.name.toString() !== value &&
            (newData = { ...newData, name: value });
        } else if (key === "description") {
          currentProduct.description.toString() !== value &&
            (newData = { ...newData, description: value });
        }
      });

      if (Object.keys(newData).length > 0) {
        try {
          setIsLoading(true);
          await axios.patch(
            `https://express-bay-rho.vercel.app/api/products/${currentProduct._id}`,
            newData
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
    }
  };
  const findDisabled = () => {
    // Sahələrin dəyişdirilib-dəyişdirilmədiyini yoxla
    const isFormChanged =
      form.description !== currentProduct.description ||
      form.price.toString() !== currentProduct.price.toString() ||
      form.name !== currentProduct.name ||
      form.store !== currentProduct.store._id;

    // Səhv yoxlaması
    const hasErrors = !Object.values(errors).every((e) => e === "");

    return !isFormChanged || hasErrors;
  };

  return (
    <View className="bg-white/5 rounded-3xl p-6 relative flex-col gap-3 mt-4">
      <ButtonsContainer
        type={type}
        setType={setType}
        cancel={() => {
          setForm({
            name: currentProduct.name,
            price: currentProduct.price.toString(),
            description: currentProduct.description,
            store: currentProduct.store._id,
          });
        }}
        submit={() => {
          Alert.alert("Məhsul məlumatlarını dəyişdirmək istəyirsiniz?", "", [
            {
              text: "Xeyr",
              style: "cancel",
            },
            {
              text: "Bəli",
              onPress: () => update(),
            },
          ]);
        }}
        submitDisabled={findDisabled()}
      />

      {!type ? (
        <View className="pt-2 flex-col gap-2">
          <Text numberOfLines={1} className="text-xl font-semibold text-white">
            {currentProduct.name}
          </Text>

          <Text className="text-3xl font-bold text-emerald-400">
            {currentProduct.price} AZN
          </Text>
        </View>
      ) : (
        <View className="flex-col gap-2 pt-4">
          <FormField
            text="Məhsulun adı"
            title="name"
            handleChange={(value) => {
              setForm({ ...form, name: value });
            }}
            error={errors.name || undefined}
            value={form.name}
          />

          <FormField
            title="price"
            text="Qiymət"
            keyboardType="numeric"
            handleChange={(value) => {
              setForm({ ...form, price: value });
            }}
            value={form.price}
            error={errors.price || undefined}
          />
        </View>
      )}
      {type ? (
        <FormField
          title="description"
          text="Açıqlama"
          handleChange={(value) => {
            setForm({ ...form, description: value });
          }}
          value={form.description}
          error={errors.description || undefined}
        />
      ) : (
        <Text
          numberOfLines={3}
          className="text-white text-base leading-relaxed"
        >
          {currentProduct.description}
        </Text>
      )}
      {!type ? (
        <View className="flex-row items-center bg-white/5 p-3 rounded-xl">
          <FontAwesome5 name="store" size={16} color="#f97316" />
          <Text numberOfLines={1} className="text-white ml-2 font-medium">
            {currentProduct.store?.name}
          </Text>
        </View>
      ) : (
        <CustomSelect
          title="Mağaza"
          defaultValue={{
            id: form.store,
            title: user.stores?.find((s) => s._id === form.store)?.name!,
          }}
          handleChange={(value) => {
            setForm({ ...form, store: value });
          }}
          placeholder="Seç"
          modalTitle="Mağaza seçin"
          data={
            user.stores?.map((store) => ({
              title: store.name,
              id: store._id,
            })) || []
          }
          error={errors.store || undefined}
        />
      )}
    </View>
  );
};

export default DetailContainer;
