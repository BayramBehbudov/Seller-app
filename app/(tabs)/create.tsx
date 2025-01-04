import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySelector from "@/components/Create/category/CategorySelector";
import { useGlobalContext } from "@/context/GlobalProvider";
import ProductInfo from "@/components/Create/info/ProductInfo";
import CustomButton from "@/components/CustomButton";
import EmptyComponent from "@/components/EmptyComponent";
import { router } from "expo-router";
import { IProduct, IResponse } from "@/types/interfaces";
import FeaturesComp from "@/components/Create/feature/FeaturesComp";
import { imageUploaderCloudinary } from "@/services/claudinaryActions";
import mongoose from "mongoose";
import axios from "axios";
import ImageandVariants from "@/components/Create/image/ImageandVariants";

const create = () => {
  const [formData, setFormData] = useState<IProduct & { store: string }>({
    name: "",
    price: "",
    description: "",
    store: "",
    features: {},
    category: {
      main: "",
      sub: "",
      child: "",
    },
    image: {
      _id: "",
      imageUrl: "",
    },

    variants: [],
  });

  const [submitStep, setSubmitStep] = useState<
    "cat" | "info" | "images" | "features"
  >("cat");

  const { user, setIsLoading, refetchUser } = useGlobalContext();

  const submit = async () => {
    setIsLoading(true);
    if (!user.stores || user.stores?.length === 0)
      return Alert.alert("Səhv", "Öncə mağaza yaratmalısınız");

    if (!formData.image.imageUrl || !formData.image._id)
      return Alert.alert("Səhv", "Məhsul üçün əsas şəkil seçilməlidir");

    if (!formData.store) return Alert.alert("Səhv", "Mağaza seçilməlidir");

    if (
      !formData.category.main ||
      !formData.category.sub ||
      !formData.category.child ||
      !formData.description ||
      !formData.name ||
      !formData.price
    ) {
      return Alert.alert("Səhv", "Məhsul məlumatlarını doldurun");
    }

    const mainImage = await imageUploaderCloudinary(formData.image);

    const subImages = await Promise.all(
      formData.variants
        .flatMap((v) => v.images)
        .map((i) => imageUploaderCloudinary(i))
    );

    const newVariants = formData.variants.map((v) => ({
      ...v,
      images: v.images.map((i) => subImages.find((s) => s?._id === i._id)),
    }));

    const newForm = {
      ...formData,
      store: new mongoose.Types.ObjectId(formData.store),
      image: mainImage,
      variants: newVariants,
    };

    try {
      const res: IResponse = await axios.post(
        `https://express-bay-rho.vercel.app/api/products/create`,
        newForm
      );

      if (res.status === 200) {
        await refetchUser();

        setFormData({
          name: "",
          price: "",
          description: "",
          store: "",
          features: {},
          category: {
            main: "",
            sub: "",
            child: "",
          },
          image: {
            _id: "",
            imageUrl: "",
          },

          variants: [],
        });
        setSubmitStep("cat");
        Alert.alert("Məhsul əlavə edildi");
      } else {
        Alert.alert("Səhv", res.message);
      }
    } catch (error: any) {
      Alert.alert("Səhv", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user.stores || user.stores.length === 0) {
    return (
      <View className="w-full h-full flex-col justify-center items-center bg-primary ">
        <EmptyComponent
          title="Sizin aktiv mağazanız yoxdur"
          subtitle="Məhsul əlavə etmək üçün öncə hesabınıza mağaza əlavə edin"
        />
        <CustomButton
          containerStyles="mt-10 w-[80%] "
          title="Mağaza əlavə et"
          handlePress={() => router.push(`/store/add`)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-primary px-3 w-full h-full pt-3 gap-3 flex-col">
      <Text className="text-white text-2xl font-bold text-center mb-5">
        {submitStep === "cat" && "Kateqoriya"}
        {submitStep === "info" && "Məhsul məlumatları"}
        {submitStep === "images" && "Şəkillər və Çeşidlər"}
        {submitStep === "features" && "Xüsusiyyətlər"}
      </Text>

      <View className="w-full gap-3 flex pb-[55px] flex-col">
        {submitStep === "cat" && (
          <CategorySelector
            selectedCategory={formData.category}
            setSelectedCategory={(e) => {
              setFormData({ ...formData, category: e as IProduct["category"] });
            }}
            setSubmitStep={setSubmitStep}
          />
        )}

        {submitStep === "info" && (
          <ProductInfo
            formData={formData}
            setFormData={setFormData}
            setSubmitStep={setSubmitStep}
          />
        )}

        {submitStep === "images" && (
          <ImageandVariants
            selectedCategory={formData.category}
            formData={formData}
            setFormData={setFormData}
            setSubmitStep={setSubmitStep}
          />
        )}
        {submitStep === "features" && (
          <FeaturesComp
            selectedCategory={formData.category}
            formData={formData}
            setFormData={setFormData}
            submit={submit}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default create;
