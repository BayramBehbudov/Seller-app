import { View, Text, ScrollView, Alert } from "react-native";
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
  IProductImages,
  IProductDB,
  ISelectedAttributes,
} from "@/types/interfaces";
import FilterSelector from "@/components/Create/FilterSelector/FilterSelector";
import { useGlobalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import EditImageController from "@/components/ProductEdit.tsx/EditImageController";
import CustomLoader from "@/components/CustomLoader";
import axios from "axios";
import CustomSelect from "@/components/CustomSelect";
import { editedImages } from "@/services/claudinaryActions";

const EditProduct = () => {
  const { id } = useGlobalSearchParams();

  const { user, isLoading, setIsLoading, refetchUser } = useGlobalContext();

  const currentProduct = user.stores
    ?.flatMap((store) => store.products)
    .find((product: IProductDB) => product._id === id);

  if (!currentProduct) return <></>;

  const [selectedCategory, setSelectedCategory] =
    useState<ISelectedCategoryStructure>();

  const [attributes, setAttributes] = useState<ISelectedAttributes>(
    currentProduct?.attributes as ISelectedAttributes
  );

  const [features, setFeatures] = useState<ISelectedFeatures>(
    currentProduct?.features as ISelectedFeatures
  );

  const [images, setImages] = useState<IProductImages>({} as IProductImages);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      name: currentProduct.name,
      category: {
        main: currentProduct.category.main,
        sub: currentProduct.category.sub,
        child: currentProduct.category.child,
      },
      price: currentProduct.price.toString(),
      description: currentProduct.description,
      store: currentProduct.store._id,
    },
  });

  const submit = async (data: any) => {
    if (!id) return;
    setIsLoading(true);
    let newData = {};

    if (JSON.stringify(currentProduct.features) !== JSON.stringify(features)) {
      newData = { ...newData, features: features };
    }

    if (
      JSON.stringify(currentProduct.attributes) !== JSON.stringify(attributes)
    ) {
      newData = { ...newData, attributes: attributes };
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key === "store") {
        currentProduct.store._id !== value &&
          (newData = { ...newData, store: value });
      } else if (key === "price") {
        currentProduct.price.toString() !== value &&
          (newData = { ...newData, price: value });
      } else {
        if (
          JSON.stringify(currentProduct[key as keyof IProduct]) !==
          JSON.stringify(value)
        ) {
          newData = { ...newData, [key]: value };
        }
      }
    });

    if (images?.main?.imageUrl || images?.subImages?.length > 0) {
      const uploadedImages: Partial<IProductImages | undefined> =
        await editedImages(images);
      if (uploadedImages) {
        newData = {
          ...newData,
          images: {
            main: uploadedImages?.main
              ? uploadedImages.main
              : currentProduct.images.main,
            subImages: uploadedImages.subImages
              ? [
                  ...uploadedImages.subImages,
                  ...currentProduct.images.subImages,
                ]
              : currentProduct.images.subImages,
          },
        };
      }
    }

    if (Object.keys(newData).length > 0) {
      try {
        const updated = await axios.patch(
          `${process.env.EXPO_PUBLIC_BASE_URL}/api/products/${id}`,
          newData
        );
        await refetchUser();
        Alert.alert(updated.data.message);
      } catch (error) {
        Alert.alert(
          "Xəta",
          "Məhsul məlumatları dəyişdirilərkən xəta baş verdi"
        );
      }
    }
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
          <Controller
            control={control}
            name="store"
            render={({ field: { onChange, value } }) => (
              <CustomSelect
                title="Mağaza"
                handleChange={onChange}
                placeholder="Seç"
                modalTitle="Mağaza seçin"
                data={
                  user.stores?.map((store) => ({
                    title: store.name,
                    id: store._id,
                  })) || []
                }
                defaultValue={{
                  id: currentProduct.store._id,
                  title: currentProduct.store.name,
                }}
                error={errors?.store?.message || undefined}
              />
            )}
          />
          {currentProduct && (
            <EditImageController
              setImage={setImages}
              currentProduct={currentProduct}
            />
          )}
          {selectedCategory && (
            <FilterSelector
              selectedCategory={selectedCategory}
              attributes={attributes}
              setAttributes={setAttributes}
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
