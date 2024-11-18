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
  IProductImages,
} from "@/types/interfaces";
import FilterSelector from "@/components/Create/FilterSelector/FilterSelector";
import { useGlobalContext } from "@/context/GlobalProvider";
import { z } from "zod";
import CustomSelect from "@/components/CustomSelect";
import axios from "axios";
import { uploadImagesToCloudinary } from "@/services/claudinaryActions";


const create = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    ISelectedCategoryStructure | undefined
  >(undefined);

  const [images, setImages] = useState<IProductImages>({} as IProductImages);
  const [attributes, setAttributes] = useState<ISelectedAttributes>(
    {} as ISelectedAttributes
  );
  const [features, setFeatures] = useState<ISelectedFeatures>(
    {} as ISelectedFeatures
  );

  const { user, isLoading, setIsLoading, refetchUser } = useGlobalContext();

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
      store: "",
      category: {
        main: "",
        sub: "",
        child: "",
      },
    },
  });

  const submit = async (data: z.infer<typeof AddProductSchema>) => {
    setIsLoading(true);
    if (!images.main.imageUrl)
      return Alert.alert("Səhv", "Məhsul üçün əsas şəkil seçilməlidir");

    if (!user?.stores.length)
      return Alert.alert("Səhv", "Öncə mağaza yaratmalısınız");

    if (!data.store) return Alert.alert("Səhv", "Mağaza seçilməlidir");

    const uploadedImages = await uploadImagesToCloudinary(images);
    if (!uploadedImages) return;

    try {
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/products/create`,
        {
          ...data,
          images: uploadedImages,
          attributes,
          features,
        }
      );
      if (res.status === 200) {
        await refetchUser();
        reset();
        setSelectedCategory(undefined);
        setImages({} as IProductImages);
        setAttributes({} as ISelectedAttributes);
        setFeatures({} as ISelectedFeatures);
        Alert.alert(res.data.message);
      } else {
        Alert.alert("Səhv", res.data.message);
      }
    } catch (error: any) {
      Alert.alert("Səhv", error.message);
    } finally {
      setIsLoading(false);
    }
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

              <Controller
                control={control}
                name="store"
                render={({ field: { onChange } }) => (
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
                    error={errors?.store?.message || undefined}
                  />
                )}
              />

              <ImageController setImage={setImages} />

              <FilterSelector
                selectedCategory={selectedCategory}
                setAttributes={setAttributes}
                attributes={attributes}
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
