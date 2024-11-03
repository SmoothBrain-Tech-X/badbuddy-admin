"use client";
import { Text } from "@mantine/core";
import { format } from "date-fns";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import VenueForm from "../../_components/VenueForm/VenueForm";
import useGetVenue from "@/hooks/venue/useGetVenue";
import { useParams, useRouter } from "next/navigation";
import useUpdateVenue from "@/hooks/venue/useUpdateVenue";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import BackButton from "@/app/_components/BackButton/BackButton";

export default function Page() {
  const navigate = useRouter();
  const params = useParams<{ id: string }>();
  const getVenue = useGetVenue({ venue_id: params.id });
  const updateVenue = useUpdateVenue();
  const onEdit = (data: VenueSchemaType) => {
    if (!params.id) return;
    const keyNoti = notifications.show({
      ...LoadingNotificationData,
      message: "Creating venue...",
    });
    updateVenue.mutate(
      {
        venue_id: params.id,
        ...data,
        status: data.status ?? "",
      },
      {
        onSuccess: () => {
          notifications.update({
            id: keyNoti,
            ...SuccessNotificationData,
            message: "Venue updated successfully",
          });
          navigate.push("/venue");
        },
        onError: (error) => {
          notifications.show({
            id: keyNoti,
            ...ErrorNotificationData,
            message: error.message,
          });
        },
      },
    );
  };
  return (
    <div className="flex flex-col">
      <BackButton />
      <Text size="xl" fw={700}>
        Edti Venue
      </Text>
      <VenueForm
        type="edit"
        onFinish={onEdit}
        data={{
          ...getVenue.data,
          name: getVenue.data?.name ?? "",
          description: getVenue.data?.description ?? "",
          address: getVenue.data?.address ?? "",
          location: getVenue.data?.location ?? "",
          phone: getVenue.data?.phone ?? "",
          email: getVenue.data?.email ?? "",
          image_urls: getVenue.data?.image_urls ?? "",
          open_range: getVenue.data?.open_range ?? [],
        }}
      />
    </div>
  );
}
