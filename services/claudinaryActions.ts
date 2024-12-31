import axios from "axios";

interface IImage {
  imageUrl: string;
  _id: string;
}

export const imageUploaderCloudinary = async (image: IImage) => {
  if (!image.imageUrl) return;
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_ID}/image/upload`,
      {
        file: image.imageUrl,
        public_id: image._id,
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
      _id: response.status === 200 ? response.data.public_id : null,
    };
  } catch (error: any) {
    console.error(
      "Error uploading image",
      error.response ? error.response.data : error.message
    );
  }
};
