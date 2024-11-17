import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainImagesSelector from "./MainImagesSelector";
import SelectivImagesSelector from "./SelectivImagesSelector";
import { IProductImages, ISelectedImages } from "@/types/interfaces";
import { getImageUrl } from "@/services/imageUploader";
import { DocumentPickerAsset } from "expo-document-picker";

const ImageController = ({
  setImage,
  defaultImages,
  type = "add",
}: {
  setImage: (value: ISelectedImages) => void;
  defaultImages?: IProductImages;
  type?: "add" | "edit";
}) => {
  const [images, setImages] = useState<ISelectedImages>({} as ISelectedImages);
  //  main: { image: "", imageId: "" },
  //  subImages: [{ image: "", imageTag: null, imageId: "" }],

  const handleDeleteImage = (index: number | string) => {
    setImages({
      ...images,
      subImages: images.subImages.filter((_: any, i: number) => i !== index),
    });
  };

  useEffect(() => {
    if (defaultImages && type === "edit") {
      setImages({
        main: {
          image: defaultImages.main.url,
          imageId: defaultImages.main.imageId,
        },
        subImages: defaultImages?.subImages?.map(
          (item: any, index: number) => ({
            image: item.url,
            imageId: item.imageId,
            imageTag: item.imageTag,
          })
        ),
      });
    }
    // setImage(images);
  }, [defaultImages]);

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
