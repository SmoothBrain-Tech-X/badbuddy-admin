"use client";
import { Box, LoadingOverlay, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import BackButton from "@/app/_components/BackButton/BackButton";
import useGetFacilitie from "@/hooks/facilitie/useGetFacilitie";
import useUpdateFacilitie from "@/hooks/facilitie/useUpdateFacilitie";
import { type FacilitieSchemaType } from "@/schemas/facilitie/facilitie.schema";
import FacilitieForm from "../../_components/FacilitieForm/FacilitieForm";

export default function Page() {
  const navigate = useRouter();
  const params = useParams<{ id: string }>();

  const getFacilitie = useGetFacilitie({ facilitie_id: params.id });
  const updateFacilitie = useUpdateFacilitie();

  const onEdit = (data: FacilitieSchemaType) => {
    if (!params.id) return;
    const keyNoti = notifications.show({
      ...LoadingNotificationData,
      message: "Updating facilitie...",
    });
    updateFacilitie.mutate(
      {
        facilitie_id: data.facilitie_id!,
        name: data.name,
      },
      {
        onSuccess: () => {
          notifications.update({
            id: keyNoti,
            ...SuccessNotificationData,
            message: "Facilitie updated successfully",
          });
          navigate.push("/facilitie");
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
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={getFacilitie.isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <div className="flex flex-col">
          <BackButton />
          <Text size="xl" fw={700}>
            Edti Facilitie
          </Text>
          <FacilitieForm
            type="edit"
            data={getFacilitie.data}
            onFinish={onEdit}
          />
        </div>
      </Box>
    </>
  );
}
