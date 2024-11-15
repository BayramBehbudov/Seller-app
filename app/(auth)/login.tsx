import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/settings/schemes";
import { loginUser } from "@/services/userActions";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Models } from "react-native-appwrite";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { setUser, setIsLoggedIn, isLoading, setIsLoading } =
    useGlobalContext();

  const submit = async (data: any) => {
    setIsLoading(true);
    const { email, password } = data;

    const user = await loginUser(email, password);

    if (user.status === 200) {
      setUser(user.data as Models.Document);
      setIsLoggedIn(true);
      router.push("/home");
    } else {
      Alert.alert("Giriş", user.message);
    }
    setIsLoading(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full w-full ">
      <ScrollView>
        <View className="w-full justify-center p-4 h-full gap-3">
          <Text className="text-white text-center text-2xl font-psemibold mt-5">
            Giriş
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="email"
                text="Email"
                handleChange={onChange}
                keyboardType="email-address"
                value={value}
                error={errors?.name?.message || undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="password"
                text="Şifrə"
                handleChange={onChange}
                value={value}
                error={errors?.password?.message || undefined}
              />
            )}
          />

          <CustomButton
            title="Giriş"
            handlePress={handleSubmit(submit)}
            containerStyles="mt-5"
            disabled={isLoading}
          />

          <View className="justify-center flex-row pt-5  gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Hesabınız yoxdur?
            </Text>
            <Link
              href="/register"
              className="text-lg text-secondary font-psemibold"
            >
              Qeydiyyat
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
