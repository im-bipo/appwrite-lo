import React, { useState } from "react";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import InputDate from "@/components/InputDate";
import InputFile from "@/components/InputFile";
import Button from "@/components/Button";
import { createNewEvent } from "@/lib/events";
import { uploadFile } from "@/lib/storage";
import { useLocation } from "wouter";

type EventImageType = {
  width: number;
  height: number;
  file: File;
};

function EventNew() {
  const [, setLocation] = useLocation();
  const [error] = useState<string>();
  const [image, setImage] = useState<EventImageType>();

  /* handleOnSubmit*/

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };
    const img = new Image();
    img.onload = function () {
      setImage({
        width: img.width,
        height: img.height,
        file: target.files[0],
      });
    };
    img.src = URL.createObjectURL(target.files[0]);
  };

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      location: { value: string };
      date: { value: string };
    };
    let file;

    if (image?.file) {
      file = await uploadFile(image.file);
    }
    const formData = {
      date: new Date(target.date.value).toISOString(),
      name: target.name.value,
      location: target.location.value,
      imageFileId: file?.$id,
      imageHeight: image?.height,
      imageWidth: image?.width,
    };
    const result = await createNewEvent(formData);
    setLocation("/event/" + result.$id);
  }
  return (
    <Layout>
      <Container className="grid gap-12 grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
          <p className="mb-4">
            Creating an event on LiveBeat is a surefire way to elevate your
            event's success to unprecedented heights. From concerts to
            festivals, LiveBeat caters to all event types, making it the ideal
            stage to capture the attention of your target audience.
          </p>
          <p>
            Focus on what matters most—delivering an unforgettable
            experience—and witness your event gain momentum like never before on
            LiveBeat.
          </p>
        </div>

        <form
          className="border border-slate-200 dark:border-slate-500 rounded p-6"
          onSubmit={handleOnSubmit}
        >
          <FormRow className="mb-5">
            <FormLabel htmlFor="name">Event Name</FormLabel>
            <InputText id="name" name="name" type="text" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="date">Event Date</FormLabel>
            <InputDate id="date" name="date" type="datetime-local" required />
          </FormRow>

          <FormRow className="mb-5">
            <FormLabel htmlFor="location">Event Location</FormLabel>
            <InputText id="location" name="location" type="text" required />
          </FormRow>

          <FormRow className="mb-6">
            <FormLabel htmlFor="image">File</FormLabel>
            <InputFile id="image" name="image" onChange={handleOnChange} />
            <p className="text-sm mt-2">Accepted File Types: jpg, png</p>
          </FormRow>

          <Button>Submit</Button>

          {error && <p className="bg-red-50 p-4 mt-6 rounded">{error}</p>}
        </form>
      </Container>
    </Layout>
  );
}

export default EventNew;
