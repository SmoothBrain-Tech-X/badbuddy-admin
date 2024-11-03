"use client";
import { Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import BackButton from "@/app/_components/BackButton/BackButton";
import { type FacilitieSchemaType } from "@/schemas/facilitie/facilitie.schema";
import FacilitieForm from "../_components/FacilitieForm/FacilitieForm";
import useCreateFacilitie from "@/hooks/facilitie/useCreateFacilitie";

export default function Page() {
  const navigate = useRouter();
  const createFacilitie = useCreateFacilitie();

  const onFinish = (data: FacilitieSchemaType) => {
    const keyNoti = notifications.show({
      ...LoadingNotificationData,
      message: "Creating facilitie...",
    });
    createFacilitie.mutate(
      {
        name: data.name,
      },
      {
        onSuccess: () => {
          notifications.update({
            id: keyNoti,
            ...SuccessNotificationData,
            message: "Facilitie created successfully",
          });
          navigate.push("/facilitie");
        },
        onError: (error) => {
          notifications.update({
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
        Create Facilitie
      </Text>
      <FacilitieForm type="create" onFinish={onFinish} />
    </div>
  );
}
