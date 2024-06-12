import { Client, Databases, Storage } from "appwrite";
import { AppwriteProjectTypes } from "@/types/appwrite";
const client = new Client();

export const APPWRITE_PROJECT: AppwriteProjectTypes = {
  ProjectId: "6663ecd10023fca064be",
  Databases: "6667cbba00336315a0f3",
  Collection: "6667cbf9003861dbc62e",
  Bucket: "66687517003b14ad4dbc",
};

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(APPWRITE_PROJECT.ProjectId);

export const database = new Databases(client);
export const storage = new Storage(client);
