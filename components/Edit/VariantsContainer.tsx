import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { IProductDB, IProductVariant } from "@/types/interfaces";
import ButtonsContainer from "./ButtonsContainer";
import VariantCard from "./VariantCard";
import axios from "axios";

const VariantsContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  const [variants, setVariants] = useState<IProductVariant[]>(
    JSON.parse(JSON.stringify(currentProduct.variants))
  );
  const [type, setType] = useState(false);

  const handleSave = () => {
    const deletedVariants = currentProduct.variants.filter(
      (oldVariant) =>
        !variants.some((newVariant) => newVariant._id === oldVariant._id)
    );

    const deletedImages: string[] = [];

    if (deletedVariants.length > 0) {
      deletedVariants.forEach((variant) => {
        deletedImages.push(...variant.images.map((image) => image._id));
      });
    }

    currentProduct.variants.forEach((oldVariant) => {
      const newVariant = variants.find((v) => v._id === oldVariant._id);
      if (newVariant) {
        const imagesToDelete = oldVariant.images.filter(
          (oldImage) =>
            !newVariant.images.some((newImage) => newImage._id === oldImage._id)
        );
        deletedImages.push(...imagesToDelete.map((img) => img._id));
      }
    });

    if (deletedImages.length > 0) {
      // deleteImages(deletedImages);
    }

    // db funksiyası qalıb attribut yoxlamaları edəndən sonra göndərməliyik
    if (
      deletedVariants.length > 0 ||
      deletedImages.length > 0 ||
      currentProduct.variants.length !== variants.length
    ) {
      console.log("Yenilənmiş variantlar var");
    } else {
      console.log("Yenilənmiş variantlar yoxdur");
    }
  };

  const deleteImages = async (ids: string[]) => {
    const response = await axios.delete(
      `https://express-bay-rho.vercel.app/api/image/`,
      {
        params: {
          ids,
        },
      }
    );
    response.status === 200 && console.log("Şəkillər silindi");
  };

  return (
    <View className="bg-white/5 rounded-3xl p-5 gap-3 flex-col">
      <ButtonsContainer
        setType={setType}
        type={type}
        cancel={() => {
          setVariants(JSON.parse(JSON.stringify(currentProduct.variants)));
        }}
        submit={handleSave}
        submitDisabled={false}
      />
      <Text className="text-white text-xl font-bold mb-2 ">Çeşidlər</Text>

      <ScrollView horizontal>
        {variants.map((variant, index) => (
          <VariantCard
            key={variant._id}
            variant={variant}
            type={type}
            variants={variants}
            setVariants={setVariants}
            category={currentProduct.category}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default VariantsContainer;
