import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainImagesSelector from "./MainImagesSelector";
import SelectivImagesSelector from "./SelectivImagesSelector";
import {  IProductImages } from "@/types/interfaces";

const ImageController = ({
  setImage,
}: {
  setImage: (value: IProductImages) => void;
}) => {
  const [images, setImages] = useState<IProductImages>({} as IProductImages);

  const handleDeleteImage = (index: number | string) => {
    setImages({
      ...images,
      subImages: images.subImages.filter((_: any, i: number) => i !== index),
    });
  };

  // useEffect(() => {
  //   if (defaultImages && type === "edit") {
  //     setImages({
  //       main: {
  //         image: defaultImages.main.imageUrl,
  //         imageId: defaultImages.main.imageId,
  //       },
  //       subImages: defaultImages?.subImages?.map(
  //         (item: any, index: number) => ({
  //           image: item.imageUrl,
  //           imageId: item.imageId,
  //           imageTag: item.imageTag,
  //         })
  //       ),
  //     });
  //   }
  //   // setImage(images);
  // }, [defaultImages]);

  useEffect(() => {
    setImage(images);
  }, [images]);

  return (
    <>
      <Text className={`text-base text-gray-100 font-pmedium`}>Əsas şəkil</Text>
      <MainImagesSelector images={images} setImages={setImages} />
      <SelectivImagesSelector
        images={images}
        setImages={setImages}
        deleteImage={handleDeleteImage}
      />
    </>
  );
};

export default ImageController;
