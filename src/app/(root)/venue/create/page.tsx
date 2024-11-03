"use client";
import { Text } from "@mantine/core";
import VenueForm from "../_components/VenueForm/VenueForm";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import useCreateVenue from "@/hooks/venue/useCreateVenue";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ item: string }>();
  const createVenue = useCreateVenue();
  const onCreate = (data: VenueSchemaType) => {
    const keyNoti = notifications.show({
      ...LoadingNotificationData,
      message: "Creating venue...",
    });
    createVenue.mutate(data, {
      onSuccess: () => {
        notifications.update({
          id: keyNoti,
          ...SuccessNotificationData,
          message: "Venue created successfully",
        });
      },
      onError: (error) => {
        notifications.show({
          id: keyNoti,
          ...ErrorNotificationData,
          message: error.message,
        });
      },
    });
  };
  return (
    <div className="flex flex-col">
      <Text size="xl" fw={700}>
        Create Venue
      </Text>
      <VenueForm type="create" onFinish={onCreate} />
    </div>
  );
}
