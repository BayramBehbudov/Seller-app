import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectCategory from "@/components/SelectCategory";
import FormField from "@/components/FormField";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductSchema } from "@/settings/schemes";
import CustomButton from "@/components/CustomButton";
import {
  IProduct,
  ISelectedFeatures,
  ISelectedCategoryStructure,
  ISelectedFilters,
  ISelectedImages,
} from "@/types/interfaces";
import FilterSelector from "@/components/Create/FilterSelector/FilterSelector";
import { useGlobalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import EditImageController from "@/components/ProductEdit.tsx/EditImageController";
import CustomLoader from "@/components/CustomLoader";
import { productUpdate } from "@/services/productActions";
import { subImagesUploader } from "@/services/imageUploader";

const EditProduct = () => {
  const { id } = useGlobalSearchParams();

  const { user, isLoading, setIsLoading, refetchUser } = useGlobalContext();

  const currentProduct = user.products.find(
    (product: IProduct) => product.$id === id
  );

  const [selectedCategory, setSelectedCategory] =
    useState<ISelectedCategoryStructure>();
  const [filters, setFilters] = useState<ISelectedFilters[]>(
    currentProduct.filters
  );

  const [features, setFeatures] = useState<ISelectedFeatures[]>(
    currentProduct.features
  );

  const [images, setImages] = useState<ISelectedImages>();
  console.log('images', images);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: currentProduct?.name,
      category: {
        main: currentProduct?.category.main,
        sub: currentProduct?.category.sub,
        child: currentProduct?.category.child,
      },
      price: currentProduct?.price,
      description: currentProduct?.description,
    },
  });

  const submit = async (data: any) => {
    setIsLoading(true);
    let newData = {};
    if (images && images.subImages.length > 0) {
      const newImages = await subImagesUploader(images.subImages);
      const updatedImages = {
        main: currentProduct.images.main,
        subImages: [...currentProduct.images.subImages, ...newImages],
      };
      newData = { ...newData, images: JSON.stringify(updatedImages) };
    }
    if (JSON.stringify(currentProduct.features) !== JSON.stringify(features)) {
      newData = { ...newData, features: JSON.stringify(features) };
    }

    if (JSON.stringify(currentProduct.filters) !== JSON.stringify(filters)) {
      newData = { ...newData, filters: JSON.stringify(filters) };
    }

    Object.entries(data).forEach(([key, value]) => {
      JSON.stringify(currentProduct[key]) !== JSON.stringify(value) &&
        (newData = { ...newData, [key]: value });
    });

    await productUpdate(currentProduct.$id, newData);

    // ana səhifədə state yaranmır amma user dəyişir. dəyişiklik görünmür
    await refetchUser();

    setIsLoading(false);
  };

  return (
    <SafeAreaView className="bg-primary w-full h-full">
      <ScrollView className="w-full px-3">
        {isLoading && (
          <CustomLoader animating={true} size={"large"} color="white" />
        )}
        <Text className="text-white text-2xl font-bold text-center mb-5">
          Məlumatlara Düzəliş et
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
                error={errors?.category ? "Kategoriya seçin" : undefined}
                value={value}
                disabled={true}
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

          <EditImageController
            setImage={setImages}
            currentProduct={currentProduct}
          />
          {selectedCategory && (
            <FilterSelector
              selectedCategory={selectedCategory}
              filters={filters}
              setFilters={setFilters}
              features={features}
              setFeatures={setFeatures}
            />
          )}

          <CustomButton
            title="Məhsulu yenilə"
            handlePress={handleSubmit(submit)}
            disabled={isLoading}
            containerStyles="mt-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProduct;
