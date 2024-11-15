// import { IPickerAssests } from "@/types/interfaces";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.EXPO_PUBLIC_CLOUDINARY_ID,
//   api_key: process.env.EXPO_PUBLIC_CLOUDINARY_API,
//   api_secret: process.env.EXPO_PUBLIC_CLOUDINARY_SECRET,
// });


// const cld = new Cloudinary({
//   cloud: {
//       cloudName: 'demo'
//   }
// });

// export const uploadImagesToCloudinary = async (images: {
//   main: IPickerAssests;
//   subImages: { image: IPickerAssests; imageTag: string | null }[];
// }) => {
//   const uploadSubImages =
//     images.subImages &&
//     (await Promise.all(
//       images.subImages.map(
//         (imageItem: { image: IPickerAssests; imageTag: string | null }) =>
//           cloudinary.uploader.upload(imageItem.image.uri, {
//             folder: "products",
//             tags: imageItem.imageTag,
//           })
//       )
//     ));

//   const uploadMainImage = await cloudinary.uploader.upload(images.main.uri, {
//     folder: "products",
//     tags: "main",
//   });

//   console.log({ uploadMainImage, uploadSubImages });
//   return {
//     main: {
//       url: uploadMainImage.secure_url,
//       imageTag: null,
//     },
//     subImages: uploadSubImages?.map((result) => {
//       return {
//         url: result.secure_url,
//         imageTag: result.tags[0],
//       };
//     }),
//   };
// };
