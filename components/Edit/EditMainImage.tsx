import { View, Alert, Text } from "react-native";
import React, { useState } from "react";
import MainImage from "../Create/image/MainImage";
import { IProduct, IProductDB } from "@/types/interfaces";
import { openPicker } from "@/helpers/openPicker";
import { imageUploaderCloudinary } from "@/services/claudinaryActions";
import { useGlobalContext } from "@/context/GlobalProvider";
import axios from "axios";
import ButtonsContainer from "./ButtonsContainer";

const EditMainImage = ({ currentProduct }: { currentProduct: IProductDB }) => {
  const [type, setType] = useState(false);
  const [selectedImages, setSelectedImages] = useState<{
    imageUrl: string;
    _id: string;
  }>(currentProduct.image);

  const { setIsLoading, refetchUser } = useGlobalContext();

  const update = async () => {
    if (selectedImages._id !== currentProduct.image._id) {
      try {
        setIsLoading(true);
        const res = await axios.delete(
          `https://express-bay-rho.vercel.app/api/image/${currentProduct.image._id}`
        );

        if (res?.status === 200) {
          const mainImage = await imageUploaderCloudinary(selectedImages);
          await axios.patch(
            `https://express-bay-rho.vercel.app/api/products/${currentProduct._id}`,
            { image: mainImage?._id ? mainImage : currentProduct.image }
          );
        }
        await refetchUser();
        setType(false);
        Alert.alert("Məhsulun əsas şəkili dəyişdirildi");
      } catch (error) {
        Alert.alert(
          "Xəta",
          "Məhsul məlumatları dəyişdirilərkən xəta baş verdi"
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setSelectedImages(currentProduct.image);
    }
  };
  return (
    <View className="mt-4 relative">
      <ButtonsContainer
        cancel={() => setSelectedImages(currentProduct.image)}
        type={type}
        setType={setType}
        submit={() => {
          Alert.alert(
            "Məhsulun əsas şəklini dəyişmək istəyirsiniz?",
            "Bu əməliyyatı geri qaytara bilməyəcəksiniz",
            [
              {
                text: "Xeyr",
                style: "cancel",
              },
              {
                text: "Bəli",
                onPress: () => update(),
              },
            ]
          );
        }}
        submitDisabled={
          selectedImages._id === currentProduct.image._id ? true : false
        }
      />
      <Text
        style={{ left: 15 }}
        className="text-base text-gray-100 font-pmedium absolute  top-4"
      >
        Məhsulun əsas şəkli
      </Text>
      <MainImage
        image={selectedImages}
        setImages={() => {
          if (type) {
            openPicker((i: IProduct["image"][]) => {
              setSelectedImages(i[0]);
            }, "main");
          }
        }}
        disabled={!type}
        style={{ paddingTop: 40, height: 240 }}
      />
    </View>
  );
};

export default EditMainImage;
