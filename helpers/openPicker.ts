import * as DocumentPicker from "expo-document-picker";

// interface DocumentPickerResult {
//   type: "success" | "cancel";
//   assets?: Array<{
//     uri: string;
//     name: string;
//     size: number;
//     mimeType?: string;
//   }>;
// }

export const openPicker = async (
  setValue: (prev: any) => void,
  title: "main" | "sub"
) => {
  const result = await DocumentPicker.getDocumentAsync({
    type: ["image/png", "image/jpg", "image/jpeg"],
    multiple: title === "sub" ? true : false,
  });
  if (!result.canceled) {
    if (title === "sub") {
      setValue((prev: any) => ({
        ...prev,
        subImages: result.assets.map((item: any) => ({
          image: { ...item, imageId: null },
          imageTag: null,
        })),
      }));
    }
    if (title === "main") {
      setValue((prev: any) => ({
        ...prev,
        main: { ...result.assets[0], imageId: null },
      }));
    }
  }
};
