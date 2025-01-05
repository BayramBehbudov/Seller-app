import { View, Alert, ScrollView } from "react-native";
import React from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/settings/schemes";
import FormField from "../FormField";
import CustomButton from "../CustomButton";
import CustomSelect from "../CustomSelect";
import axios from "axios";
import { IUser, IUserDB } from "@/types/interfaces";

const EditProfile = () => {
  const { user, setUser, setIsLoading } = useGlobalContext();

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

  const findUpdate = (data: IUser) => {
    const newData: IUser = data;

    Object.keys(data).forEach((key) => {
      if (data[key as keyof IUser] === user[key as keyof IUser]) {
        delete newData[key as keyof IUser];
      }
    });

    return Object.keys(newData).length > 0 ? newData : null;
  };

  const updateProfile = async (data: IUser) => {
    Alert.alert("Hesab məlumatlarınızı dəyişmək istəyirsiniz", "", [
      {
        text: "Xeyr",
        onPress: () => {},
      },
      {
        text: "Bəli",
        onPress: async () => {
          try {
            const updatedData = findUpdate(data);
            if (updatedData) {
              setIsLoading(true);

              await axios.patch(
                `https://express-bay-rho.vercel.app/api/user/${user?._id}`,
                updatedData
              );
              setUser({ ...user, ...updatedData } as IUserDB);
              Alert.alert("Təbriklər", "Hesab məlumatları uğurla dəyişdirildi");
            }
          } catch (error) {
            console.log("error in update user", error);
          } finally {
            setIsLoading(false);
          }
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
