import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomSelect from "@/components/CustomSelect";
import CustomButton from "@/components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/settings/schemes";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";
import { IResponse } from "@/types/interfaces";

const Register = () => {
  const { setUser, setIsLoggedIn, isLoading, setIsLoading } =
    useGlobalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const submit = async (data: any) => {
    setIsLoading(true);
    try {
      const newUser: IResponse = await axios.post(
        `https://express-bay-rho.vercel.app/api/auth/register`,
        { ...data, role: "seller" }
      );
      if (newUser.status === 200 && newUser.data) {
        setUser(newUser.data);
        setIsLoggedIn(true);
        router.push("/home");
      } else {
        Alert.alert("Qeydiyyat", newUser.message as string);
      }
      
    } catch (error: any) {
      Alert.alert("Qeydiyyat", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full ">
      <ScrollView>
        <View className="w-full justify-center p-4 h-full gap-3">
          <Text className="text-white text-center text-2xl font-psemibold mt-5">
            Qeydiyyat
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="email"
                text="Email"
                handleChange={onChange}
                keyboardType="email-address"
                value={value}
                error={errors?.email?.message || undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="password"
                text="Şifrə"
                handleChange={onChange}
                value={value}
                error={errors?.password?.message || undefined}
              />
            )}
          />

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
            name="surname"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="surname"
                text="Soyad"
                handleChange={onChange}
                value={value}
                error={errors?.surname?.message || undefined}
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
            name="gender"
            render={({ field: { onChange } }) => (
              <CustomSelect
                title="Cins"
                handleChange={onChange}
                placeholder="Seç"
                modalTitle="Cinsinizi seçin"
                data={[
                  { id: "male", title: "Kişi" },
                  { id: "female", title: "Qadın" },
                ]}
                error={errors?.gender ? "Cinsinizi seçin" : undefined}
              />
            )}
          />

          <CustomButton
            title="Qeydiyyat"
            handlePress={handleSubmit(submit)}
            containerStyles="mt-5"
            disabled={isLoading}
          />

          <View className="justify-center flex-row pt-5  gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Hesabınız var?
            </Text>
            <Link
              href="/login"
              className="text-lg text-secondary font-psemibold"
            >
              Daxil olun
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
