import { ID } from "appwrite";
import { storage } from "./appwrite";

export const uploadFile = async (file: File) => {
  const data = await storage.createFile(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    ID.unique(),
    file
  );
  return data;
};

export const getPreviewImageById = (FileId: string) => {
  const data = storage.getFilePreview(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    FileId
  );
  return data.href;
};
