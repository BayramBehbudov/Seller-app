import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import { IProduct, ISelectedImages } from "@/types/interfaces";
import { getImageUrl, imageDelete } from "@/services/imageUploader";
import MainImagesSelector from "../Create/AddImages/MainImagesSelector";
import SelectivImagesSelector from "../Create/AddImages/SelectivImagesSelector";
import { useGlobalContext } from "@/context/GlobalProvider";
import { productUpdate } from "@/services/productActions";

const EditImageController = ({
  setImage,
  currentProduct,
}: {
  setImage: (value: ISelectedImages) => void;
  currentProduct: IProduct;
}) => {
  const { refetchUser, setIsLoading } = useGlobalContext();

  const [currentImages, setCurrentImages] = useState<ISelectedImages>(
    {} as ISelectedImages
  );

  const [newImages, setNewImages] = useState<ISelectedImages>(
    {} as ISelectedImages
  );
  const handleDeleteImage = async (imageId: string | number) => {
    setIsLoading(true);
    const deleted = await imageDelete(imageId as string);

    if (deleted.status === 200) {
      const newImages = {
        main: currentProduct.images.main,
        subImages: currentProduct.images.subImages?.filter(
          (item) => item.imageId !== imageId
        ),
      };

      const updated = await productUpdate(currentProduct._id, {
        images: JSON.stringify(newImages),
      });

      if (updated.status === 200) {
        refetchUser();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentImages = {
      main: {
        uri: getImageUrl(currentProduct.images?.main),
        name: "",
        size: 0,
        imageId: currentProduct.images?.main,
        mimeType: "image",
      },
      subImages: currentProduct.images.subImages.map(
        (item: { imageId: string; imageTag: string | null }) => ({
          image: {
            uri: getImageUrl(item.imageId, 200, 200),
            name: "",
            mimeType: "image",
            size: 0,
            imageId: item.imageId,
          },
          imageTag: item.imageTag,
        })
      ),
    };
    setCurrentImages(currentImages);
  }, [currentProduct]);

  useEffect(() => {
    if (newImages?.main || newImages?.subImages?.length > 0) {
      setImage(newImages);
    }
  }, [newImages]);

  return (
    <>
      <Text className={`text-base text-gray-100 font-pmedium`}>Əsas şəkil</Text>
      <MainImagesSelector
        images={currentImages}
        setImages={setNewImages}
        disabled={true}
      />
      <SelectivImagesSelector
        images={currentImages}
        deleteImage={handleDeleteImage}
        disabled={true}
      />
      <SelectivImagesSelector
        images={newImages}
        setImages={setNewImages}
        deleteImage={(index) => {
          setNewImages({
            ...newImages,
            subImages: newImages.subImages.filter(
              (_: any, i: number) => i !== index
            ),
          });
        }}
      />
    </>
  );
};

export default EditImageController;
