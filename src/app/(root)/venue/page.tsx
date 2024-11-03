"use client";

import useGetVenues from "@/hooks/venue/useGetVenues";
import { Button, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";

export default function Page() {
  const getVenues = useGetVenues();

  return (
    <div className="flex flex-col gap-3">
      <Text size="xl" fw={700}>
        Venues Manager
      </Text>
      <div className="flex items-center justify-between">
        <TextInput
          placeholder="Search Venues"
          leftSection={<IconSearch size={16} />}
        />
        <div>
          <Button>Add Venue</Button>
        </div>
      </div>
      <DataTable
        withTableBorder
        striped
        highlightOnHover
        columns={[
          {
            accessor: "name",
            title: "Name",
          },
          {
            accessor: "phone",
            title: "Phone",
          },
          {
            accessor: "status",
            title: "Status",
          },
          {
            accessor: "id",
            title: "Actions",
            render: (record) => <div className="">Actions</div>,
          },
        ]}
        records={getVenues.data?.venues}
      />
    </div>
  );
}
