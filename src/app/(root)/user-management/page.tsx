"use client";

import useGetUsersSearch from "@/hooks/user/useGetUsersSearch";
import { Badge, Button, Modal, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { Table } from "antd";
import { type ColumnProps } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";
import UpdateRoleForm from "./_components/UpdateRoleForm/UpdateRoleForm";
import { getRoleMap } from "utils/RoleMap";
import useUpdateUserRole from "@/hooks/user/useUpdateUserRole";
import { UpdateRoleSchemaType } from "@/schemas/user/updateRole.schema";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import { AxiosError } from "axios";

export default function UserManagementPage() {
  const [keyWord, setKeyWord] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const updateUserRole = useUpdateUserRole();
  const getVenues = useGetUsersSearch({
    q: keyWord,
    offset,
    limit,
  });

  type ColumnType = NonNullable<typeof getVenues.data>["users"] extends
    | (infer T)[]
    | null
    | undefined
    ? T
    : never;
  const [opened, { open, close }] = useDisclosure(false);

  const [UpdateRole, setUpdateRole] = useState<ColumnType>();

  const onFinishUpdateRole = async (data: UpdateRoleSchemaType) => {
    const noti = notifications.show(LoadingNotificationData);
    updateUserRole.mutate(
      {
        user_id: data.user_id,
        role: data.role,
      },
      {
        onSuccess: () => {
          notifications.update({
            ...SuccessNotificationData,
            id: noti,
            message: "Role Updated",
            color: "teal",
          });
          close();
          void getVenues.refetch();
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.update({
              ...ErrorNotificationData,
              id: noti,
              message: error.response?.data.error,
              color: "red",
            });
          }
        },
      },
    );
    close();
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Text size="xl" fw={700}>
          Users Manager
        </Text>
        <div className="flex items-center justify-between">
          <TextInput
            placeholder="Search Users"
            leftSection={<IconSearch size={16} />}
            onChange={(e) => setKeyWord(e.currentTarget.value)}
            value={keyWord}
          />
        </div>
        <div className="overflow-x-auto">
          <Table
            bordered
            loading={getVenues.isLoading || getVenues.isRefetching}
            dataSource={getVenues.data?.users}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.bio}</p>
              ),
              rowExpandable: (record) => record.bio.length > 0,
            }}
            columns={
              [
                {
                  title: "Name",
                  render: (_, record) =>
                    record.first_name + " " + record.last_name,
                },
                {
                  title: "Gender",
                  render: (_, record) => record.gender,
                },
                {
                  title: "Phone",
                  render: (_, record) => record.phone,
                },
                {
                  title: "Email",
                  render: (_, record) => record.email,
                },
                {
                  title: "Role",
                  render: (_, record) => (
                    <Badge
                      variant="light"
                      color={getRoleMap(record.role)?.color}
                    >
                      {record.role}
                    </Badge>
                  ),
                },
                {
                  title: "Actions",
                  render: (_, record) => (
                    <div className="flex gap-1">
                      <Button
                        onClick={() => {
                          setUpdateRole(record);
                          open();
                        }}
                      >
                        Update Role
                      </Button>
                    </div>
                  ),
                },
              ] as ColumnProps<ColumnType>[]
            }
          />
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Update Role">
        <Badge>{UpdateRole?.email}</Badge>
        <UpdateRoleForm
          type="edit"
          data={{
            role: UpdateRole?.role ?? "",
            user_id: UpdateRole?.id ?? "",
          }}
          onFinish={onFinishUpdateRole}
        />
      </Modal>
    </>
  );
}
