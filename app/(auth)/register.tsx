import { View, Text, ScrollView, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomSelect from "@/components/CustomSelect";
import useAppwrite from "@/services/useAppwrite";
import { getPoints } from "@/services/pointAction";
import { Models } from "react-native-appwrite";
import CustomButton from "@/components/CustomButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/settings/schemes";
import { createUser } from "@/services/userActions";
import { useGlobalContext } from "@/context/GlobalProvider";

const Register = () => {
  const { data: points } = useAppwrite(getPoints);
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
    const newAccount = await createUser(data);
    if (newAccount.status === 200) {
      setUser(newAccount.data as Models.Document);
      setIsLoggedIn(true);
      router.push("/home");
    } else {
      Alert.alert("Qeydiyyat", newAccount.message);
    }
    setIsLoading(false);
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
            render={({ field: { onChange, onBlur, value } }) => (
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="name"
                text="Mağazanın adı"
                handleChange={onChange}
                value={value}
                error={errors?.name?.message || undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
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
            render={({ field: { onChange, onBlur, value } }) => (
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
                data={points?.map((item: Models.Document) => {
                  return {
                    id: item.$id,
                    title: item.name,
                  };
                })}
                error={errors?.point?.message || undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title="description"
                text="Açıqlama"
                handleChange={onChange}
                value={value}
                error={errors?.description?.message || undefined}
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
