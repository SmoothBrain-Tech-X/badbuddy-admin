"use client";
import { Text } from "@mantine/core";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import VenueForm from "../../_components/VenueForm/VenueForm";
import useGetVenue from "@/hooks/venue/useGetVenue";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const getVenue = useGetVenue({ venue_id: id });
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
