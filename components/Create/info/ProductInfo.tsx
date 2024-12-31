import { View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import CustomSelect from "@/components/CustomSelect";
import { useGlobalContext } from "@/context/GlobalProvider";
import { IProduct } from "@/types/interfaces";

const ProductInfo = ({
  formData,
  setFormData,
  setSubmitStep,
}: {
  formData: IProduct & { store: string };
  setFormData: React.Dispatch<
    React.SetStateAction<IProduct & { store: string }>
  >;
  setSubmitStep: React.Dispatch<
    React.SetStateAction<"cat" | "info" | "images" | "features">
  >;
}) => {
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    store: "",
  });
  const { user } = useGlobalContext();

  return (
    <View className="flex-col gap-3">
      <FormField
        title="name"
        text="Ad"
        handleChange={(value) => {
          setFormData({ ...formData, name: value });
          setErrors({
            ...errors,
            name:
              value.toString().trim().length === 0
                ? "Məhsulun adını daxil edin"
                : "",
          });
        }}
        error={errors.name || undefined}
        value={formData.name}
      />
      <FormField
        title="description"
        text="Açıqlama"
        handleChange={(value) => {
          setFormData({ ...formData, description: value });
          setErrors({
            ...errors,
            description:
              value.toString().trim().length === 0
                ? "Məhsulun açıqlamasını daxil edin"
                : "",
          });
        }}
        value={formData.description}
        error={errors.description || undefined}
      />

      <FormField
        title="price"
        text="Qiymət"
        keyboardType="numeric"
        handleChange={(value) => {
          setFormData({ ...formData, price: value });
          setErrors({
            ...errors,
            price: !/^[1-9][0-9]*(\.[0-9]{1,2})?$/.test(value)
              ? "Məhsulun qiymətini düzgün daxil edin. məs. 9, 10.99, 155.6"
              : "",
          });
        }}
        value={formData.price.toString()}
        error={errors.price || undefined}
      />

      <CustomSelect
        title="Mağaza"
        defaultValue={{
          id: formData.store,
          title: user.stores?.find((s) => s._id === formData.store)?.name!,
        }}
        handleChange={(value) => {
          setFormData({ ...formData, store: value });
          setErrors({
            ...errors,
            store:
              value.toString().trim().length === 24 ||
              value.toString().trim().length === 0
                ? ""
                : "Mağaza seçilməlidir",
          });
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

      <CustomButton
        handlePress={() => {
          const newErrors = {
            name: "",
            price: "",
            description: "",
            store: "",
          };

          if (formData.name.trim().length < 5) {
            newErrors.name = "Ad minimum 5 simvol olmalıdır";
          }

          if (!/^[1-9][0-9]*(\.[0-9]{1,2})?$/.test(formData.price)) {
            newErrors.price =
              "Məhsulun qiymətini düzgün daxil edin, məs. 9, 10.99, 155.6 ";
          }

          if (formData.description.trim().length < 10) {
            newErrors.description = "Açıqlama minimum 10 simvol olmalıdır";
          }

          if (!user.stores.some((s) => s._id === formData.store)) {
            newErrors.store = "Mağaza seçilməlidir";
          }

          setErrors(newErrors);

          if (Object.values(newErrors).every((e) => e === "")) {
            setSubmitStep("images");
          }
        }}
        title="Davam et"
        containerStyles="w-full"
        disabled={
          !formData.name ||
          !formData.price ||
          !formData.description ||
          !formData.store
        }
      />
    </View>
  );
};

export default ProductInfo;
