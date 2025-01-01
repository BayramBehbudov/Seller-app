import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { IProductDB, IProductVariant } from "@/types/interfaces";
import ButtonsContainer from "./ButtonsContainer";
import VariantCard from "./VariantCard";
import axios from "axios";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { generateUniqueId, openPicker } from "@/helpers/openPicker";
import { imageUploaderCloudinary } from "@/services/claudinaryActions";

const VariantsContainer = ({
  currentProduct,
}: {
  currentProduct: IProductDB;
}) => {
  const [variants, setVariants] = useState<IProductVariant[]>(
    JSON.parse(JSON.stringify(currentProduct.variants))
  );
  const { setIsLoading, refetchUser } = useGlobalContext();
  const [type, setType] = useState(false);

  const handleSave = async () => {
    const deletedImages = getDeletedImageIds();
    if (hasVariantsChanged() || deletedImages.length > 0) {
      try {
        setIsLoading(true);
        if (deletedImages.length > 0) {
          await deleteImages(deletedImages);
        }
        const newImages = variants
          .flatMap((v) => v.images)
          .filter((i) => i.imageUrl.startsWith("data:image/jpeg;base64,"));

        const newUploadedImages =
          newImages.length > 0
            ? await Promise.all(
                newImages.map((i) => imageUploaderCloudinary(i))
              )
            : [];

        const newVariants = variants.map((v) => ({
          ...v,
          images: v.images.map((img) => {
            if (img.imageUrl.startsWith("data:image/jpeg;base64,")) {
              const uploadedImage = newUploadedImages.find(
                (uploaded) => uploaded?._id === img._id
              );
              return uploadedImage
                ? { ...img, imageUrl: uploadedImage.imageUrl }
                : img;
            }
            return img;
          }),
        }));

        await axios.patch(
          `https://express-bay-rho.vercel.app/api/products/${currentProduct._id}`,
          { variants: newVariants }
        );
        await refetchUser();
        setType(false);
        Alert.alert("Məhsulun məlumatları dəyişdirildi");
      } catch (error) {
        Alert.alert(
          "Xəta",
          "Məhsul məlumatları dəyişdirilərkən xəta baş verdi"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Yenilənmiş variantlar yoxdur");
    }
  };

  const hasVariantsChanged = (): boolean => {
    const deletedImages = getDeletedImageIds();
    if (deletedImages.length > 0) {
      return true;
    }

    if (currentProduct.variants.length !== variants.length) {
      return true;
    }

    const allOriginalImageIds = currentProduct.variants.flatMap((v) =>
      v.images.map((i) => i._id)
    );
    const newImageIds = variants.flatMap((v) => v.images.map((i) => i._id));

    if (allOriginalImageIds.length !== newImageIds.length) {
      return true;
    }

    for (const i of newImageIds) {
      if (!allOriginalImageIds.includes(i)) {
        return true;
      }
    }

    for (const original of currentProduct.variants) {
      const matchedVariant = variants.find((v) => v._id === original._id);
      if (!matchedVariant) {
        return true;
      }

      const areAttributesEqual = (
        attr1: Record<string, string[]>,
        attr2: Record<string, string[]>
      ) => {
        const keys1 = Object.keys(attr1).sort();
        const keys2 = Object.keys(attr2).sort();
        if (
          keys1.length !== keys2.length ||
          !keys1.every((key, idx) => key === keys2[idx])
        ) {
          return false;
        }
        return keys1.every(
          (key) =>
            attr1[key].length === attr2[key].length &&
            attr1[key].every((value) => attr2[key].includes(value))
        );
      };

      if (!areAttributesEqual(original.attributes, matchedVariant.attributes)) {
        return true;
      }
    }

    for (const current of variants) {
      const matchedOriginal = currentProduct.variants.find(
        (v) => v._id === current._id
      );
      if (!matchedOriginal) {
        return true;
      }
    }

    return false;
  };

  const getDeletedImageIds = (): string[] => {
    const deletedImages: string[] = [];

    const deletedVariants = currentProduct.variants.filter(
      (oldVariant) =>
        !variants.some((newVariant) => newVariant._id === oldVariant._id)
    );

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
    return deletedImages;
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
        submitDisabled={!hasVariantsChanged()}
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
        <TouchableOpacity
          className="bg-white/10 min-h-[300px] rounded-lg p-4 w-[250px] flex-col items-center justify-center"
          onPress={() => {
            if (!type) {
              setType(true);
            }
            openPicker((images) => {
              if (images.length > 0) {
                const newV: IProductVariant[] = [
                  ...variants,
                  { images, attributes: {}, _id: generateUniqueId() },
                ];
                setVariants(newV);
              }
            }, "sub");
          }}
        >
          <FontAwesome5 name="plus-circle" size={30} color="orange" />
          <Text className="text-sm text-gray-100 text-center font-pmedium mt-2">
            Yeni çeşid əlavə et
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default VariantsContainer;
