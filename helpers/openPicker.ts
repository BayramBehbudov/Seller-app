import * as ImagePicker from "expo-image-picker";

import { ObjectId } from "bson";
import { IProduct } from "@/types/interfaces";

export const generateUniqueId = (): string => {
  return new ObjectId().toHexString();
};

export const openPicker = async (
  setValue: ([{ imageUrl, _id }]: IProduct["image"][]) => void,
  title: "main" | "sub"
) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images", "livePhotos"],
    base64: true,
    allowsMultipleSelection: title === "sub" ? true : false,
  });

  if (!result.canceled) {
    if (title === "main") {
      setValue([
        {
          imageUrl: `data:image/jpeg;base64,${result.assets[0].base64}`,
          _id: generateUniqueId(),
        },
      ]);
    }
    if (title === "sub") {
      setValue(
        result.assets.map((image: ImagePicker.ImagePickerAsset) => ({
          imageUrl: `data:image/jpeg;base64,${image.base64}`,
          _id: generateUniqueId(),
        }))
      );
    }
  }
};
