"use client";
import { Text } from "@mantine/core";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import VenueForm from "../../_components/VenueForm/VenueForm";
import useGetVenue from "@/hooks/venue/useGetVenue";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ id: string }>();
  const onEdit = (data: VenueSchemaType) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col">
      <Text size="xl" fw={700}>
        Edti Venue
      </Text>
      <VenueForm type="edit" onFinish={onEdit} />
    </div>
  );
}
