import { ID, Models } from "appwrite";
import { EventType } from "@/types/events";
import { database } from "./appwrite";

export async function getEvents() {
  const { documents } = await database.listDocuments(
    import.meta.env.VITE_APPWRITE_DATABASE_ID,
    import.meta.env.VITE_APPWRITE_COLLECTION_ID
  );
  const event = documents.map(mapDocumentToEvent)
  return event
}

export async function getEventById(eventId: string){
    const documents  = await database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        eventId
      );
      const event = mapDocumentToEvent(documents);
      return event;
} 
export async function createNewEvent(NewEvent: Omit<EventType,'$id'>){
    const documents  = await database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,ID.unique(),NewEvent
      );
      const event = mapDocumentToEvent(documents);
      return event;
} 

function mapDocumentToEvent (document:Models.Document) {
    const event: EventType = {
        $id: document.$id,
        name: document.name,
        date: document.date,
        location: document.location
      };
      return event;
}