import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainImagesSelector from "./MainImagesSelector";
import SelectivImagesSelector from "./SelectivImagesSelector";
import {  ISelectedImages } from "@/types/interfaces";

const ImageController = ({
  setImage,
}: {
  setImage: (value: ISelectedImages) => void;
}) => {
  const [images, setImages] = useState<ISelectedImages>({} as ISelectedImages);

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
  //         image: defaultImages.main.url,
  //         imageId: defaultImages.main.imageId,
  //       },
  //       subImages: defaultImages?.subImages?.map(
  //         (item: any, index: number) => ({
  //           image: item.url,
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
