import { View, Alert } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/settings/schemes";
import FormField from "../FormField";
import CustomButton from "../CustomButton";

const EditProfile = () => {
  const { user, setUser } = useGlobalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: user?.email,
      password: user?.password,
      name: user?.name,
      address: user?.address,
      phone: user?.phone,
      description: user?.description,
      point: user?.point?._id,
    },
  });

  const updateProfile = async (data: any) => {
    Alert.alert("Hesab məlumatlarınızı dəyişmək istəyirsiniz", "", [
      {
        text: "Xeyr",
        onPress: () => {},
      },
      {
        text: "Bəli",
        onPress: () => {
          setUser({
            ...user,
            ...data,
            point: user.point,
          });
        },
      },
    ]);
  };

  return (
    <View className="w-full h-full py-2">
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

      <CustomButton
        title="Məlumatları yenilə"
        handlePress={handleSubmit(updateProfile)}
        containerStyles="mt-5"
      />
    </View>
  );
};

export default EditProfile;
