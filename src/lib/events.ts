import { ID, Models } from "appwrite";
import { EventType } from "@/types/events";
import { APPWRITE_PROJECT, database } from "./appwrite";
import { deleteImageById } from "./storage";

export async function getEvents() {
  const { documents } = await database.listDocuments(
    APPWRITE_PROJECT.Databases,
    APPWRITE_PROJECT.Collection
  );
  const event = documents.map(mapDocumentToEvent);
  return event;
}

export async function getEventById(eventId: string) {
  const documents = await database.getDocument(
    APPWRITE_PROJECT.Databases,
    APPWRITE_PROJECT.Collection,
    eventId
  );
  const event = mapDocumentToEvent(documents);
  return event;
}
export async function createNewEvent(
  NewEvent: Omit<EventType, "$id" | "imageFileId" | "imageHeight" | "imageWidth">
) {
  const documents = await database.createDocument(
    APPWRITE_PROJECT.Databases,
    APPWRITE_PROJECT.Collection,
    ID.unique(),
    NewEvent
  );
  const event = mapDocumentToEvent(documents);
  return event;
}

export async function deleteEvent(event: EventType) {
  deleteImageById(event.imageFileId);
  const documents = await database.deleteDocument(
    APPWRITE_PROJECT.Databases,
    APPWRITE_PROJECT.Collection,
    event.$id
  );
  console.log("delete document", documents);
  return documents;
}

function mapDocumentToEvent(document: Models.Document) {
  const event: EventType = {
    $id: document.$id,
    name: document.name,
    date: document.date,
    location: document.location,
    imageFileId: document.imageFileId,
    imageHeight: document.imageHeight,
    imageWidth: document.imageWidth,
  };
  return event;
}
