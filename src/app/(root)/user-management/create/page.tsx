"use client";
import { Text } from "@mantine/core";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import useCreateVenue from "@/hooks/venue/useCreateVenue";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import BackButton from "@/app/_components/BackButton/BackButton";

export default function Page() {
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
      <BackButton />
      <Text size="xl" fw={700}>
        Create Venue
      </Text>
    </div>
  );
}
