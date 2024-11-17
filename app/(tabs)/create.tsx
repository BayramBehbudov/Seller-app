import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectCategory from "@/components/SelectCategory";
import FormField from "@/components/FormField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "@/settings/schemes";
import CustomButton from "@/components/CustomButton";
import ImageController from "@/components/Create/AddImages/ImageController";
import {
  ISelectedCategoryStructure,
  ISelectedFeatures,
  ISelectedAttributes,
  ISelectedImages,
} from "@/types/interfaces";
import FilterSelector from "@/components/Create/FilterSelector/FilterSelector";
import { images } from "@/constants";
import { handleImageUploader, uploadFile } from "@/services/imageUploader";
import { useGlobalContext } from "@/context/GlobalProvider";
import { productCreate } from "@/services/productActions";

const create = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    ISelectedCategoryStructure | undefined
  >(undefined);
  const [images, setImages] = useState<ISelectedImages>({} as ISelectedImages);

  const [filters, setFilters] = useState<ISelectedAttributes[]>([]);
  const [features, setFeatures] = useState<ISelectedFeatures[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: {} as ISelectedCategoryStructure,
    },
  });

  const { user, isLoading, setIsLoading } = useGlobalContext();

  const submit = async (data: any) => {
    // setIsLoading(true);
    // const uploadedImages = await handleImageUploader(images);
    // if (uploadedImages.status !== 200 || !user._id)
    //   return Alert.alert("Səhv", uploadedImages.message);
    // const newProduct = await productCreate({
    //   seller: user._id,
    //   ...data,
    //   category: JSON.stringify(data.category),
    //   images: JSON.stringify(uploadedImages.data),
    //   // filters: JSON.stringify(filters),
    //   // features: JSON.stringify(features),
    // });
    // if (newProduct?.status === 200) {
    //   reset();
    //   setSelectedCategory(undefined);
    //   // setImages({} as ISelectedImages);
    //   // setFilters([]);
    //   // setFeatures([]);
    //   Alert.alert(newProduct.message);
    // } else {
    //   Alert.alert("Səhv", newProduct?.message);
    // }
    // setIsLoading(false);
  };

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <ScrollView className="w-full">
        <Text className="text-white text-2xl font-bold text-center mb-5">
          Məhsul Məlumatları
        </Text>

        <View className="w-full  gap-3 flex flex-col pb-3">
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <SelectCategory
                setValue={(value) => {
                  onChange({
                    main: value.main.id,
                    sub: value.sub.id,
                    child: value.child.id,
                  });
                  setSelectedCategory(value);
                }}
                value={value}
                error={errors?.category ? "Kategoriya seçin" : undefined}
              />
            )}
          />

          {selectedCategory && (
            <>
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
                name="price"
                render={({ field: { onChange, value } }) => (
                  <FormField
                    title="price"
                    text="Qiymət"
                    handleChange={onChange}
                    keyboardType="numeric"
                    value={value}
                    error={errors?.price?.message || undefined}
                  />
                )}
              />
              <ImageController setImage={setImages} />

              <FilterSelector
                selectedCategory={selectedCategory}
                setFilters={setFilters}
                filters={filters}
                features={features}
                setFeatures={setFeatures}
              />
            </>
          )}

          <CustomButton
            title="Məhsul Yarat"
            handlePress={handleSubmit(submit)}
            containerStyles="mt-5"
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
