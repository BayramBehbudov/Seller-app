import { databaseId, DBAppwrite, pointsId } from "../config/appwrite";

export const getPoints = async () => {
  try {
    const points = await DBAppwrite.listDocuments(databaseId, pointsId);
    return {
      status: points.documents.length > 0 ? 200 : 404,
      message: `Təyinat nöqtəsi məlumatları ${
        points.documents.length > 0 ? "tapıldı" : " tapılmadı"
      }`,
      data: points.documents.length > 0 ? points.documents : undefined,
      error: null,
    };
  } catch (err) {
    return {
      status: 500,
      message: "Təyinat nöqtəsi məlumatları əldə edilərkən xəta baş verdi",
      data: undefined,
      error: err,
    };
  }
};
