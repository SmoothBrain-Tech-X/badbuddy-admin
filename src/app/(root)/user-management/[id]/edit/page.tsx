"use client";
import { Text } from "@mantine/core";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import useGetVenue from "@/hooks/venue/useGetVenue";
import { useParams } from "next/navigation";
type TParams = { id: string };

export default function Page() {
  const params = useParams<{ id: string }>();
  const getVenue = useGetVenue({ venue_id: params.id });
  const onEdit = (data: VenueSchemaType) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col">
      <Text size="xl" fw={700}>
        Edti Venue
      </Text>
    </div>
  );
}
