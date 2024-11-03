"use client";

import useGetUsersSearch from "@/hooks/user/useGetUsersSearch";
import { Button, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { Table } from "antd";
import { type ColumnProps } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";

export default function UserManagementPage() {
  const [keyWord, setKeyWord] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const getVenues = useGetUsersSearch({
    q: keyWord,
    offset,
    limit,
  });

  console.log(getVenues.data);

  type ColumnType = NonNullable<typeof getVenues.data>["users"] extends
    | (infer T)[]
    | null
    | undefined
    ? T
    : never;

  return (
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
        {/* <div>
          <Link href="/user-management/create">
            <Button>Add User</Button>
          </Link>
        </div> */}
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
            ] as ColumnProps<ColumnType>[]
          }
        />
      </div>
    </div>
  );
}
