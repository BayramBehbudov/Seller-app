import { ISelectedImages } from "@/types/interfaces";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { DocumentPickerAsset } from "expo-document-picker";

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
      setValue((prev: ISelectedImages) => ({
        subImages: prev.subImages,
        main: {
          image: `data:image/jpeg;base64,${result.assets[0].base64}`,
          imageId: "",
        },
      }));
    }
    if (title === "sub") {
      setValue((prev: ISelectedImages) => ({
        main: prev.main,
        subImages: result.assets.map((image: ImagePicker.ImagePickerAsset) => ({
          image: `data:image/jpeg;base64,${image.base64}`,
          imageId: "",
          imageTag: null,
        })),
      }));
    }
  }
};