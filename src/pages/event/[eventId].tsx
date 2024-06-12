import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Button from "@/components/Button";

import { deleteEvent, getEventById } from "@/lib/events";
import { useEffect, useState } from "react";
import { EventType } from "@/types/events";
import { getPreviewImageById } from "@/lib/storage";
import { useLocation } from "wouter";

type EventParamsType = {
  params: {
    eventId: string;
  };
};

function Event({ params }: EventParamsType) {
  const [,setLocation] = useLocation()
  const [event, setEvent] = useState<EventType | undefined>();
  const imageUrl =
    event?.imageFileId && getPreviewImageById(event?.imageFileId);
  const image = {
    url: imageUrl,
    alt: "",
  };

  useEffect(() => {
    (async function run() {
      const eventData = await getEventById(params.eventId);
      setEvent(eventData);
    })();
  }, [params.eventId]);

  

  const handleDelete = async () => {
    event && (await deleteEvent(event));
    setLocation('/?eventdeleted=eventid')
  };

  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          {image?.url && (
            <img
              className="block rounded"
              width={800}
              height={450}
              src={image.url}
              alt={image.alt}
            />
          )}
        </div>

        <div>
          {event && (
            <>
              <h1 className="text-3xl font-bold mb-6">{event?.name}</h1>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Date:</strong>{" "}
                {event?.date &&
                  new Date(event?.date).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-200">
                <strong>Location:</strong> {event?.location}
              </p>
              <p className="mt-6">
                <Button color="red" onClick={handleDelete}>
                  Delete Event
                </Button>
              </p>
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Event;
