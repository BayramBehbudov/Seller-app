import { View, Alert, ScrollView } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/settings/schemes";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import CustomSelect from "../CustomSelect";

const EditProfile = () => {
  const { user} = useGlobalContext();

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
      surname: user?.surname,
      phone: user?.phone,
      gender: user?.gender,
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
          //   updateUser(data);
        },
      },
    ]);
  };

  return (
    <ScrollView className="w-full h-full py-2 gap-2 flex-col">
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
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            title="Cins"
            handleChange={onChange}
            placeholder="Seç"
            modalTitle="Cinsinizi seçin"
            data={[
              { id: "male", title: "Kişi" },
              { id: "female", title: "Qadın" },
            ]}
            defaultValue={
              value === "male"
                ? { id: "male", title: "Kişi" }
                : { id: "female", title: "Qadın" }
            }
            error={errors?.gender ? "Cinsinizi seçin" : undefined}
          />
        )}
      />

      <CustomButton
        title="Məlumatları yenilə"
        handlePress={handleSubmit(updateProfile)}
        containerStyles="mt-5 mb-24"
      />
    </ScrollView>
  );
};

export default EditProfile;
