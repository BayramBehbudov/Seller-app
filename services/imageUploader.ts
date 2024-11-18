import { ID } from "react-native-appwrite";
import { projectId, storage, storageId } from "../config/appwrite";
import { DocumentPickerAsset, IProductImages } from "@/types/interfaces";

export const handleImageUploader = async (images: IProductImages) => {
  const mainImages = await uploadFile(images.main);

  const subImages = images.subImages
    ? await subImagesUploader(images.subImages)
    : null;

  if (mainImages?.status !== 200)
    return {
      status: 500,
      data: undefined,
      error: mainImages?.error,
      message: "Əsas şəkil tələb edilir",
    };
  return {
    status: 200,
    data: { main: mainImages.data, subImages },
    error: null,
    message: "Şəkil əlavə olundu",
  };
};


export const subImagesUploader = async (
  images: { image: DocumentPickerAsset; imageTag: string | null }[]
) => {
  const subImages = await Promise.all(
    images.map(
      async (imageItem: { image: DocumentPickerAsset; imageTag: string | null }) => {
        const id = await uploadFile(imageItem.image);
        return {
          imageId: id?.data,
          imageTag: imageItem.imageTag,
        };
      }
    )
  );

  return subImages;
};

export const uploadFile = async (file: DocumentPickerAsset) => {
  if (!file) return;
  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), {
      ...file,
      type: file.mimeType,
    });

    return {
      status: 200,
      data: uploadedFile._id,
      error: null,
      message: "Şəkil əlavə olundu",
    };
  } catch (error: any) {
    return {
      status: 500,
      data: undefined,
      error: error,
      message: "Şəkil əlavə olunmadı: " + error.message,
    };
  }
};

export const getImageUrl = (id: string, w?: number, h?: number, q?: number) => {
  return `https://cloud.appwrite.io/v1/storage/buckets/${storageId}/files/${id}/preview?${
    w ? "width=" + w + "&" : ""
  }${h ? "height=" + h + "&" : ""}${
    q ? "quality=" + q + "&" : ""
  }project=${projectId}`;
};

export function extractFileId(url: string) {
  const match = url.match(/\/files\/([^/]+)\//);
  return match ? match[1] : null;
}

export const imageDelete = async (_id: string) => {
  try {
    await storage.deleteFile(storageId, _id);
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
};

// export const getFilePreview = async (fileId: string) => {
//   //bu funksiya aşağıdakı formada return edir. yəni hansı id göndərsən sadəcə filesdan sonra qaytarır. əgər lazım olsa manual da etmək olar. çünkü boş id də göndərsən nəticə qaytarır. amma qaytardığı link açılmır. belə ki image olaraq id saxlayıb sonra həmin id  ilə url düzəltmək olar

//   // https://cloud.appwrite.io/v1/storage/buckets/673065ef003e2ce3a35f/files/saasas/preview?width=2000&height=2000&gravity=top&quality=100&project=6730642d003a9032d597
//   // https://cloud.appwrite.io/v1/storage/buckets/673065ef003e2ce3a35f/files/6735dd48002ca91063e6/preview?width=2000&height=2000&gravity=top&quality=100&project=6730642d003a9032d597

//   const fileUrl = storage.getFilePreview(
//     storageId,
//     fileId,
//     2000,
//     2000,
//     ImageGravity.Top,
//     100
//   );
//   return fileUrl;
// };

// const uploadedFile = {
//   $createdAt: "2024-11-14T10:54:18.949+00:00",
//   _id: "6735d6d9003524abb92e",
//   $permissions: [
//     'read("user:6735c2af0032404e8c5c")',
//     'update("user:6735c2af0032404e8c5c")',
//     'delete("user:6735c2af0032404e8c5c")',
//   ],
//   $updatedAt: "2024-11-14T10:54:18.949+00:00",
//   bucketId: "673065ef003e2ce3a35f",
//   chunksTotal: 1,
//   chunksUploaded: 1,
//   mimeType: "image/jpeg",
//   name: "Screenshot_2024-11-04-12-09-16-288_com.instagram.android.jpg",
//   signature: "b5c1cf67b3a0a56b46338bf84d7228aa",
//   sizeOriginal: 349316,
// };

// const fileUrl =
//   "https://cloud.appwrite.io/v1/storage/buckets/673065ef003e2ce3a35f/files/6735d6d9003524abb92e/preview?width=2000&height=2000&gravity=top&quality=100&project=6730642d003a9032d597";
