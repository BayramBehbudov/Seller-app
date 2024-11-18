import { Text } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { IProductDB, IProductImages } from "@/types/interfaces";
import MainImagesSelector from "../Create/AddImages/MainImagesSelector";
import SelectivImagesSelector from "../Create/AddImages/SelectivImagesSelector";
import { useGlobalContext } from "@/context/GlobalProvider";

const EditImageController = ({
  setImage,
  currentProduct,
}: {
  setImage: React.Dispatch<SetStateAction<IProductImages>>;
  currentProduct: IProductDB;
}) => {
  const { refetchUser, setIsLoading } = useGlobalContext();

  const [currentImages, setCurrentImages] = useState<IProductImages>(
    currentProduct.images
  );

  const [newImages, setNewImages] = useState<IProductImages>(
    {} as IProductImages
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
    setImage(newImages);
  }, [newImages]);

  return (
    <>
      <Text className={`text-base text-gray-100 font-pmedium`}>Əsas şəkil</Text>
      <MainImagesSelector
        images={newImages.main ? newImages : currentImages}
        setImages={setNewImages}
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
