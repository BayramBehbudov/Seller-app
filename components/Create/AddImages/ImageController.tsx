import { Text } from "react-native";
import React, { useEffect, useState } from "react";
import MainImagesSelector from "./MainImagesSelector";
import SelectivImagesSelector from "./SelectivImagesSelector";
import { IPickerAssests, ISelectedImages } from "@/types/interfaces";
import { getImageUrl } from "@/services/imageUploader";

const ImageController = ({
  setImage,
  defaultImages,
}: {
  setImage: (value: ISelectedImages) => void;
  defaultImages?: any;
}) => {
  const [images, setImages] = useState<ISelectedImages>({
    main: {} as IPickerAssests,
    subImages: [{ image: {} as IPickerAssests, imageTag: null }],
  });

  const handleDeleteImage = (index: number | string) => {
    setImages({
      ...images,
      subImages: images.subImages.filter((_: any, i: number) => i !== index),
    });
  };

  useEffect(() => {
    if (defaultImages && !images.subImages[0].image.uri) {
      setImages({
        main: {
          uri: getImageUrl(defaultImages?.main),
          name: "",
          size: 0,
          imageId: defaultImages?.main,
          mimeType: "image",
        },
        subImages: defaultImages?.subImages?.map(
          (item: any, index: number) => ({
            image: {
              uri: getImageUrl(item.imageId),
              name: "",
              imageId: item.imageId,
            },
            imageTag: item.imageTag,
          })
        ),
      });
    }

    setImage(images);
  }, [images, defaultImages]);

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
