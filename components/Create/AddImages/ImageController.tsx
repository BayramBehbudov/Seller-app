import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainImagesSelector from "./MainImagesSelector";
import SelectivImagesSelector from "./SelectivImagesSelector";
import { IProductImages, ISelectedCategoryStructure } from "@/types/interfaces";

const ImageController = ({
  setImage,
  selectedCategory,
}: {
  setImage: (value: IProductImages) => void;
  selectedCategory: ISelectedCategoryStructure;
}) => {
  const [images, setImages] = useState<IProductImages>({} as IProductImages);

  const handleDeleteImage = (index: number | string) => {
    setImages({
      ...images,
      subImages: images.subImages.filter((_: any, i: number) => i !== index),
    });
  };

  useEffect(() => {
    setImage(images);
  }, [images]);

  return (
    <>
      <MainImagesSelector images={images} setImages={setImages} />
      <SelectivImagesSelector
        images={images}
        setImages={setImages}
        deleteImage={handleDeleteImage}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default ImageController;
