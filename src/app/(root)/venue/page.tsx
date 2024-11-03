"use client";

import useGetVenuesSearch from "@/hooks/venue/useGetVenuesSearch";
import { ActionIcon, Badge, Button, Text, TextInput } from "@mantine/core";
import { IconPencil, IconSearch } from "@tabler/icons-react";
import { Table } from "antd";
import { type ColumnProps } from "antd/es/table";
import Link from "next/link";
import { useState } from "react";
import { getVenueStatusMap } from "utils/VenueStatusMap";

export default function Page() {
  const [keyWord, setKeyWord] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const getVenues = useGetVenuesSearch({
    q: keyWord,
    offset,
    limit,
  });

  type ColumnType = NonNullable<typeof getVenues.data>["venues"] extends
    | (infer T)[]
    | null
    | undefined
    ? T
    : never;

  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={700}>
        Venues Manager
      </Text>
      <div className="flex items-center justify-between">
        <TextInput
          placeholder="Search Venues"
          leftSection={<IconSearch size={16} />}
          onChange={(e) => setKeyWord(e.currentTarget.value)}
          value={keyWord}
        />
        <div>
          <Link href="/venue/create">
            <Button>Add Venue</Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          bordered
          pagination={{
            current: offset,
            pageSize: limit,
            total: getVenues.data?.total,
            pageSizeOptions: ["10", "20", "50"],
            onChange: (page, pageSize) => {
              setOffset(page);
              setLimit(pageSize);
            },
          }}
          loading={getVenues.isLoading || getVenues.isRefetching}
          dataSource={getVenues.data?.venues}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.description.length > 0,
          }}
          columns={
            [
              {
                title: "Name",
                render: (_, record) => record.name,
              },
              {
                title: "Rating",
                render: (_, record) => record.rating,
              },
              {
                title: "Total Reviews",
                render: (_, record) => record.total_reviews,
              },
              {
                title: "Email",
                render: (_, record) => record.email,
              },
              {
                title: "Email",
                render: (_, record) => record.phone,
              },
              {
                title: "Status",
                render: (_, record) => (
                  <Badge
                    variant="light"
                    color={getVenueStatusMap(record.status)?.color}
                  >
                    {getVenueStatusMap(record.status)?.label}
                  </Badge>
                ),
              },
              {
                title: "Action",
                render: (_, record) => (
                  <div className="flex gap-2">
                    <Link href={`/venue/${record.id}/edit`}>
                      <ActionIcon variant="subtle">
                        <IconPencil />
                      </ActionIcon>
                    </Link>
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
