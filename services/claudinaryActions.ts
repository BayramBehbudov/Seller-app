import { IProductImages } from "@/types/interfaces";
import axios from "axios";

interface IImage {
  imageUrl: string;
  imageId: string | null;
  imageTag: string | null;
}
export const uploadImagesToCloudinary = async (images: IProductImages) => {
  const subImages = images.subImages
    ? await Promise.all(
        images.subImages.map(
          async (imageItem: IImage) => await imageUploaderCloudinary(imageItem)
        )
      )
    : [];

  const resultsMainImage = await imageUploaderCloudinary({
    ...images.main,
    imageTag: null,
  });

  if (resultsMainImage) {
    return {
      main: {
        imageUrl: resultsMainImage.imageUrl,
        imageId: resultsMainImage.imageId,
      },
      subImages,
    };
  }
};

export const imageUploaderCloudinary = async (image: IImage) => {
  if (!image.imageUrl) return;
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_ID}/image/upload`,
      {
        file: image.imageUrl,
        upload_preset: "productImagesPreset",
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return {
      imageUrl: response.status === 200 ? response.data.secure_url : "",
      imageId: response.status === 200 ? response.data.public_id : null,
      imageTag: image.imageTag,
    };
  } catch (error: any) {
    console.error(
      "Error uploading image",
      error.response ? error.response.data : error.message
    );
  }
};

export const editedImages = async (images: IProductImages) => {
  if (!images) return;

  let uploadedImages = {};

  if (images.main?.imageUrl) {
    const resultsMainImage = await imageUploaderCloudinary({
      ...images.main,
      imageTag: null,
    });

    if (resultsMainImage) {
      uploadedImages = {
        ...uploadedImages,
        main: {
          imageUrl: resultsMainImage.imageUrl,
          imageId: resultsMainImage.imageId,
        },
      };
    }
  }

  if (images.subImages?.length > 0) {
    const subImages = await Promise.all(
      images.subImages.map(
        async (imageItem) => await imageUploaderCloudinary(imageItem)
      )
    );
    if (subImages) {
      uploadedImages = {
        ...uploadedImages,
        subImages,
      };
    }
  }

  return uploadedImages;
};
