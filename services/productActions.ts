import {
  databaseId,
  DBAppwrite,
  productsCollectionId,
} from "@/config/appwrite";
import { IProductDb } from "@/types/interfaces";
import { ID } from "react-native-appwrite";

export const productCreate = async (data: IProductDb) => {
  if (!data) return;
  try {
    const newProduct = await DBAppwrite.createDocument(
      databaseId,
      productsCollectionId,
      ID.unique(),
      data
    );
    return {
      status: 200,
      data: newProduct,
      error: null,
      message: "Məhsul əlavə olundu",
    };
  } catch (error: any) {
    return {
      status: 500,
      data: undefined,
      error,
      message: "Məhsul əlavə olunmadı: " + error.message,
    };
  }
};

export const productUpdate = async (_id: string, data: Partial<IProductDb>) => {
  try {
    const updatedProduct = await DBAppwrite.updateDocument(
      databaseId,
      productsCollectionId,
      _id,
      data
    );

    return {
      status: 200,
      data: updatedProduct,
      error: null,
      message: "Məhsul yeniləndi",
    };
  } catch (error: any) {
    return {
      status: 500,
      data: undefined,
      error,
      message: "Məhsul yenilənmədi: " + error.message,
    };
  }
};

export const productDelete = async (_id: string) => {
  try {
   const deletedProduct = await DBAppwrite.deleteDocument(databaseId, productsCollectionId, _id);
    console.log(deletedProduct); 
   return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
}