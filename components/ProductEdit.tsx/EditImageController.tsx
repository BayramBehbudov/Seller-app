import { Text } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  IProduct,
  IProductDB,
  IProductImages,
  ISelectedImages,
} from "@/types/interfaces";
import { getImageUrl, imageDelete } from "@/services/imageUploader";
import MainImagesSelector from "../Create/AddImages/MainImagesSelector";
import SelectivImagesSelector from "../Create/AddImages/SelectivImagesSelector";
import { useGlobalContext } from "@/context/GlobalProvider";
import { productUpdate } from "@/services/productActions";

const EditImageController = ({
  setImage,
  currentProduct,
}: {
  setImage: React.Dispatch<SetStateAction<ISelectedImages>>;
  currentProduct: IProductDB;
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
    // db-dan sil
    // const deleted = await imageDelete(imageId as string);

    // if (deleted.status === 200) {
    //   const newImages = {
    //     main: currentProduct.images.main,
    //     subImages: currentProduct.images.subImages?.filter(
    //       (item) => item.imageId !== imageId
    //     ),
    //   };

    //   const updated = await productUpdate(currentProduct._id, {
    //     images: JSON.stringify(newImages),
    //   });

    //   if (updated.status === 200) {
    //     refetchUser();
    //   }
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentImages = {
      main: {
        image: currentProduct?.images.main.url,
        imageId: currentProduct?.images.main.imageId,
      },
      subImages: currentProduct?.images.subImages.map(
        (item: {
          url: string;
          imageId: string | null;
          imageTag: string | null;
        }) => ({
          image: item.url,
          imageId: item.imageId,
          imageTag: item.imageTag,
        })
      ),
    };
    setCurrentImages(currentImages);
  }, [currentProduct]);

  useEffect(() => {
    if (newImages.main.image) {
      setImage((prev) => ({
        ...prev,
        main: newImages.main,
      }));
    }

    if (newImages?.subImages?.length > 0) {
      setImage((prev) => ({
        ...prev,
        subImages: newImages.subImages,
      }));
    }
  }, [newImages]);

  return (
    <>
      <Text className={`text-base text-gray-100 font-pmedium`}>Əsas şəkil</Text>
      <MainImagesSelector images={currentImages} setImages={setNewImages} />
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
