import { Account, Client, Databases, Storage } from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
  sellerCollectionId: process.env.EXPO_PUBLIC_SELLER_COLLECTION_ID!,
  productsCollectionId: process.env.EXPO_PUBLIC_PRODUCTS_COLLECTION_ID!,
  storageId: process.env.EXPO_PUBLIC_STORAGE_ID!,
  pointsId: process.env.EXPO_PUBLIC_POINTS_ID!,
};

export const {
  endpoint,
  platform,
  projectId,
  pointsId,
  databaseId,
  sellerCollectionId,
  productsCollectionId,
  storageId,
} = config;

export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setPlatform(platform)
  .setLocale("az");

export const DBAppwrite = new Databases(client);
export const accountAppwrite = new Account(client);
export const storage = new Storage(client);






// const avatars = new Avatars(client);

// export const getSearch = async (query: string) => {
//   try {
//     const posts = await databases.listDocuments(databaseId, videoCollectionId, [
//       Query.contains("title", query),
//     ]);
//     return posts.documents;
//   } catch (error: any) {
//     Alert.alert("Error getting query posts", error.message);
//   }
// };

// export const uploadFile = async (file: any, type: string) => {
//   if (!file) return;
//   const { mimeType, ...rest } = file;
//   const assest = { type: mimeType, ...rest };
//   try {
//     const uploadedFile = await storage.createFile(
//       storageId,
//       ID.unique(),
//       assest
//     );
//     const fileUrl = await getFilePreview(uploadedFile._id, type);
//     return fileUrl;
//   } catch (error: any) {
//     Alert.alert("Error uploading file", error.message);
//   }
// };
// export const createVideo = async (form: {
//   title: string;
//   video: {};
//   thumbnail: {};
//   prompt: string;
//   userId: string;
// }) => {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFile(form.thumbnail, "image"),
//       uploadFile(form.video, "video"),
//     ]);

//     const newVideo = await databases.createDocument(
//       databaseId,
//       videoCollectionId,
//       ID.unique(),
//       {
//         title: form.title,
//         video: videoUrl,
//         thumbnail: thumbnailUrl,
//         prompt: form.prompt,
//         creator: form.userId,
//       }
//     );

//     return newVideo;
//   } catch (error: any) {
//     Alert.alert("Error creating video", error.message);
//   }
// };
