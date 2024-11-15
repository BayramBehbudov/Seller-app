import { ID } from "react-native-appwrite";
import {
  accountAppwrite,
  databaseId,
  DBAppwrite,
  sellerCollectionId,
} from "../config/appwrite";
import { ISeller } from "@/types/interfaces";

export const manageActiveSession = async () => {
  try {
    const currentSession = await accountAppwrite.getSession("current");
    if (currentSession?.$id)
      await accountAppwrite.deleteSession(currentSession.$id);
    return { status: 200 };
  } catch (error) {
    return { status: 500 };
  }
};

const updatePhone = async (phone: string, password: string) => {
  try {
    const phoneUpdated = await accountAppwrite.updatePhone(phone, password);

    return {
      status: 200,
      message: "Nömrə yeniləndi",
      data: phoneUpdated,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      message:
        error.message ===
        "A user with the same phone number already exists in the current project."
          ? "Bu nömrə artıq qeydiyyatdan keçib"
          : error.message,
      data: undefined,
      error: error,
    };
  }
};

export const createUser = async (data: ISeller) => {
  try {
    const { name, email, password, phone } = data;

    const newAccount = await accountAppwrite.create(
      ID.unique(),
      email,
      password,
      name,
    );
    

    if (!newAccount)
      return {
        status: 500,
        message: "Qeydiyyatda xəta baş verdi.Bir qədər sonra yenidən cəhd edin",
        data: undefined,
        error: null,
      };

    const newUser = await DBAppwrite.createDocument(
      databaseId,
      sellerCollectionId,
      newAccount.$id,
      data
    );

    if (!newUser)
      return {
        status: 500,
        message: "İstifadəçi qeydə alınmadı. Bir qədər sonra yenidən cəhd edin",
        data: undefined,
        error: null,
      };

    const session = await createSession(email, password);

    await accountAppwrite.updatePhone(phone, password);
    await accountAppwrite.createPhoneVerification();

    if (session.status !== 200) return session;

    return {
      status: 200,
      message: "Qeydiyyat uğurla tamamlandı",
      data: newUser,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      message:
        error.message ===
        "A user with the same id, email, or phone already exists in this project."
          ? "Sizin artıq aktiv hesabınız var"
          : "Qeydiyyatda xəta baş verdi",
      data: undefined,
      error: error,
    };
  }
};

export const createSession = async (email: string, password: string) => {
  await manageActiveSession();
  try {
    const session = await accountAppwrite.createEmailPasswordSession(
      email,
      password
    );

    return {
      status: 200,
      message: "Sessiya yaradıldı",
      data: session,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      message:
        error.message ===
        "Invalid credentials. Please check the email and password."
          ? "Email və ya şifrə yanlışdır"
          : error.message,
      data: undefined,
      error,
    };
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await accountAppwrite.get();

    const currentUser = await DBAppwrite.getDocument(
      databaseId,
      sellerCollectionId,
      currentAccount.$id
    );

    return {
      status: 200,
      message: "İstifadəçi tapıldı",
      data: currentUser,
      error: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: "Sessiya və ya istifadəçi tapılmadı" + error.message,
      data: undefined,
      error,
    };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const session = await createSession(email, password);

    if (session.status !== 200 || !session.data) return session;

    const seller = await DBAppwrite.getDocument(
      databaseId,
      sellerCollectionId,
      session.data.userId
    );

    return {
      status: 200,
      message: `Xoş gəldin, ${seller.name}`,
      data: seller,
      error: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: `Gözlənilməyən xəta baş verdi. Bir qədər sonra yenidən cəhd edin.`,
      error,
      data: undefined,
    };
  }
};

// export const getSellerById = async (id: string) => {
//   try {
//     const seller = await DBAppwrite.getDocument(
//       databaseId,
//       sellerCollectionId,
//       id
//     );
//     return {
//       status: seller ? 200 : 404,
//       message: seller ? "Məlumatlar əldə edildi" : "Məlumat tapılmadı",
//       data: seller ? seller : undefined,
//       error: null,
//     };
//   } catch (error: any) {
//     return {
//       status: 500,
//       message: "Məlumatlar əldə edilərkən xəta baş verdi" + error.message,
//       data: undefined,
//       error: error,
//     };
//   }
// };
