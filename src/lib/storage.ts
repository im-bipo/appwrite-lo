import { ID } from "appwrite";
import { APPWRITE_PROJECT, storage } from "./appwrite";

export const uploadFile = async (file: File) => {
  const data = await storage.createFile(
    APPWRITE_PROJECT.Bucket,
    ID.unique(),
    file
  );
  return data;
};

export const getPreviewImageById = (FileId: string) => {
  const data = storage.getFilePreview(
   APPWRITE_PROJECT.Bucket,
    FileId
  );
  return data.href;
};

export const deleteImageById = (FileId: string) => {
  storage.deleteFile(APPWRITE_PROJECT.Bucket, FileId);
};
