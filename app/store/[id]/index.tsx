import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import FormField from "@/components/FormField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { StoreSchema } from "@/settings/schemes";
import { IPointDB, IResponse, IStoreDB } from "@/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const EditStore = () => {
  const { id } = useGlobalSearchParams();
  const { user, refetchUser, isLoading, setIsLoading } = useGlobalContext();
  const [points, setPoints] = useState([]);
  const currentStore =
    id !== "add" ? user.stores?.find((store) => store._id === id) : null;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/point`
        );
        if (response.status === 200) {
          setPoints(response.data);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(StoreSchema),
    defaultValues: {
      name: currentStore?.name || "",
      description: currentStore?.description || "",
      address: currentStore?.address || "",
      phone: currentStore?.phone || "",
      point: currentStore?.point._id || "",
    },
  });

  const submit = async (formValues: z.infer<typeof StoreSchema>) => {
    setIsLoading(true);

    try {
      if (id === "add") {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/store/create`,
          {
            ...formValues,
            owner: user._id,
          }
        );

        if (response.status === 200) {
          reset();
          refetchUser();
        }
      } else {
        if (!currentStore) return;

        let newValue = {};

        Object.entries(formValues).forEach(([key, value]) => {
          key === "point"
            ? currentStore.point._id !== value &&
              (newValue = { ...newValue, point: value })
            : value !== currentStore[key as keyof IStoreDB] &&
              (newValue = { ...newValue, [key]: value });
        });

        if (Object.keys(newValue).length > 0) {
          const response = await axios.patch(
            `${process.env.EXPO_PUBLIC_BASE_URL}/api/store/${id}`,
            newValue
          );

          if (response.status === 200) {
            reset();
            refetchUser();
            Alert.alert("Mağaza məlumatları dəyişdirildi");
          }
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <ScrollView className="w-full">
        <Text className="text-white text-2xl font-bold text-center mb-5">
          Mağaza məlumatları
        </Text>

        <View className="w-full  gap-3 flex flex-col pb-3">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="name"
                text="Ad"
                handleChange={onChange}
                value={value}
                error={errors?.name?.message || undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="description"
                text="Açıqlama"
                handleChange={onChange}
                value={value}
                error={errors?.description?.message || undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="address"
                text="Ünvan"
                handleChange={onChange}
                value={value}
                error={errors?.address?.message || undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="phone"
                text="Telefon"
                keyboardType="phone-pad"
                placeholder="Nümunə: +994509876543"
                handleChange={onChange}
                value={value}
                error={errors?.phone?.message || undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="point"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomSelect
                title="Təyinat nöqtəsi"
                handleChange={onChange}
                placeholder="Seç"
                modalTitle="Təyinat nöqtəsini seçin"
                data={points.map((item: IPointDB) => {
                  return {
                    id: item._id,
                    title: item.name,
                  };
                })}
                error={
                  errors?.point?.message ? "Təyinat nöqtəsini seçin" : undefined
                }
                defaultValue={{
                  id: currentStore?.point._id || "",
                  title: currentStore?.point.name || "",
                }}
              />
            )}
          />

          <CustomButton
            title={
              id === "add" ? "Mağaza yarat" : "Mağaza məlumatlarını dəyişdir"
            }
            handlePress={handleSubmit(submit)}
            containerStyles="mt-5"
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditStore;
