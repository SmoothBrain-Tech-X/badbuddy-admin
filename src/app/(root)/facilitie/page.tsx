"use client";
import { ConfirmDeleteModalData } from "@/configs/ModalData/ModalData";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import useDeleteFacilitie from "@/hooks/facilitie/useDeleteFacilitie";
import useGetFacilities from "@/hooks/facilitie/useGetFacilities";
import { ActionIcon, Button, Text, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconSearch, IconTrash } from "@tabler/icons-react";
import { Table } from "antd";
import { type ColumnProps } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [keyWord, setKeyWord] = useState("");
  const getFacilities = useGetFacilities();
  const deleteFacilitie = useDeleteFacilitie();

  type ColumnType = NonNullable<
    typeof getFacilities.data
  >["facilities"] extends (infer T)[] | null | undefined
    ? T
    : never;

  const [dataSource, setDataSource] = useState<ColumnType[] | null>(null);

  useEffect(() => {
    if (keyWord) {
      const filteredData = getFacilities.data?.facilities?.filter((data) =>
        data.name.toLowerCase().includes(keyWord.toLowerCase()),
      );
      setDataSource(filteredData ?? []);
      return;
    }
    setDataSource(getFacilities.data?.facilities ?? []);
  }, [getFacilities.data?.facilities, keyWord]);

  const onDelete = (data: ColumnType) => {
    modals.openConfirmModal({
      ...ConfirmDeleteModalData,
      onConfirm: () => {
        const keyNoti = notifications.show({
          ...LoadingNotificationData,
          message: "Deleting facilitie...",
        });
        deleteFacilitie.mutate(
          {
            facilitie_id: data.id,
          },
          {
            onSuccess: () => {
              notifications.update({
                id: keyNoti,
                ...SuccessNotificationData,
                message: "Facilitie deleted successfully",
              });
              void getFacilities.refetch();
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
      },
    });
  };

  useEffect(() => {
    void getFacilities.refetch();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={700}>
        Facilitie Manager
      </Text>
      <div className="flex items-center justify-between">
        <TextInput
          placeholder="Search Facilities"
          leftSection={<IconSearch size={16} />}
          value={keyWord}
          onChange={(e) => setKeyWord(e.currentTarget.value)}
        />
        <div>
          <Link href="/facilitie/create">
            <Button>Add Venue</Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          bordered
          loading={getFacilities.isRefetching || getFacilities.isLoading}
          dataSource={dataSource ?? []}
          columns={
            [
              {
                title: "Name",
                render: (_, record) => record.name,
              },
              {
                title: "Action",
                render: (_, record) => (
                  <div className="flex gap-2">
                    <Link href={`/facilitie/${record.id}/edit`}>
                      <ActionIcon variant="subtle">
                        <IconPencil />
                      </ActionIcon>
                    </Link>
                    <ActionIcon
                      color="red"
                      onClick={() => onDelete(record)}
                      variant="subtle"
                    >
                      <IconTrash />
                    </ActionIcon>
                  </div>
                ),
              },
            ] as ColumnProps<ColumnType>[]
          }
        />
      </div>
    </div>
  );
}
