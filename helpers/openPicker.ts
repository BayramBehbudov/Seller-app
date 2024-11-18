import { IProductImages } from "@/types/interfaces";
import * as ImagePicker from "expo-image-picker";

export const openPicker = async (
  setValue: (prev: any) => void,
  title: "main" | "sub"
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images", "livePhotos"],
    base64: true,
    allowsMultipleSelection: title === "sub" ? true : false,
  });

  if (!result.canceled) {
    if (title === "main") {
      setValue((prev: IProductImages) => ({
        subImages: prev.subImages,
        main: {
          imageUrl: `data:image/jpeg;base64,${result.assets[0].base64}`,
          imageId: null,
        },
      }));
    }
    if (title === "sub") {
      setValue((prev: IProductImages) => ({
        main: prev.main,
        subImages: result.assets.map((image: ImagePicker.ImagePickerAsset) => ({
          imageUrl: `data:image/jpeg;base64,${image.base64}`,
          imageId: null,
          imageTag: null,
        })),
      }));
    }
  }
};
