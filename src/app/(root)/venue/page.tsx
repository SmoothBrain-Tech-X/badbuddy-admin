/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Container,
  Stack,
  Paper,
  Title,
  Text,
  Group,
  Grid,
  ActionIcon,
  Button,
  Badge,
  Table,
  Modal,
  Menu,
} from "@mantine/core";
import { format } from "date-fns";
import {
  IconEdit,
  IconPlus,
  IconMapPin,
  IconClock,
  IconDotsVertical,
  IconTrash,
} from "@tabler/icons-react";
import useGetVenue from "@/hooks/venue/useGetVenue";
import VenueForm from "@/app/(root)/venue/_components/VenueForm/VenueForm";
import { type VenueSchemaType } from "@/schemas/venues/venue.schema";
import useUpdateVenue from "@/hooks/venue/useUpdateVenue";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import { AxiosError } from "axios";
import CourtForm from "./_components/CourtForm/CourtForm";
import { type CourtSchemaType } from "@/schemas/court/court.schema";
import { getCourtStatusMap } from "utils/CourtStatusMap";
import useAddCourt from "@/hooks/court/useAddCourt";
import useUpdateCourt from "@/hooks/court/useUpdateCourt";
import useDeleteCourt from "@/hooks/court/useDeleteCourt";
import { modals } from "@mantine/modals";
import { ConfirmDeleteModalData } from "@/configs/ModalData/ModalData";

const venue_id = "0c8f9940-99e5-48bf-89ea-da05adfc1d27";

export default function Page() {
  const getVenue = useGetVenue({
    venue_id: venue_id,
  });
  const updateVenue = useUpdateVenue();
  const addCourt = useAddCourt();
  const updateCourt = useUpdateCourt();
  const deleteCourt = useDeleteCourt();

  const [editVenueOpen, setEditVenueOpen] = useState(false);
  const [addCourtOpen, setAddCourtOpen] = useState(false);
  const [editCourtOpen, setEditCourtOpen] = useState(false);

  const [EditCourt, setEditCourt] = useState<CourtSchemaType | null>(null);

  const onEditVenue = (data: VenueSchemaType) => {
    updateVenue.mutate(
      { venue_id: venue_id, ...data },
      {
        onSuccess: () => {
          notifications.show({
            ...SuccessNotificationData,
          });
          void getVenue.refetch();
          setEditVenueOpen(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.show({
              ...ErrorNotificationData,
              message: error.message,
            });
          }
        },
      },
    );
  };

  const onAddCourt = (data: CourtSchemaType) => {
    addCourt.mutate(
      {
        venue_id: venue_id,
        ...data,
      },
      {
        onSuccess: () => {
          notifications.show({
            ...SuccessNotificationData,
          });
          void getVenue.refetch();
          setAddCourtOpen(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.show({
              ...ErrorNotificationData,
              message: error.message,
            });
          }
        },
      },
    );
  };

  const onEditCourt = (data: CourtSchemaType) => {
    if (!EditCourt) return;
    updateCourt.mutate(
      {
        venue_id: venue_id,
        court_id: data.court_id ?? "",
        status: data.status ?? "",
        ...data,
      },
      {
        onSuccess: () => {
          notifications.show({
            ...SuccessNotificationData,
          });
          void getVenue.refetch();
          setEditCourt(null);
          setEditCourtOpen(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            notifications.show({
              ...ErrorNotificationData,
              message: error.message,
            });
          }
        },
      },
    );
  };

  const onDeleteCourt = (data: CourtSchemaType) => {
    modals.openConfirmModal({
      ...ConfirmDeleteModalData,
      onConfirm: () => {
        deleteCourt.mutate(
          {
            venue_id: venue_id,
            court_id: data.court_id ?? "",
          },
          {
            onSuccess: () => {
              notifications.show({
                ...SuccessNotificationData,
              });
              void getVenue.refetch();
              setEditCourt(null);
              setEditCourtOpen(false);
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                notifications.show({
                  ...ErrorNotificationData,
                  message: error.message,
                });
              }
            },
          },
        );
      },
    });
  };

  const renderOverview = () => (
    <Stack>
      {/* Venue Information */}
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4}>Venue Information</Title>
            <Text size="sm" c="dimmed">
              {getVenue.data?.name}
            </Text>
          </div>
          <Button
            variant="light"
            leftSection={<IconEdit size={16} />}
            onClick={() => setEditVenueOpen(true)}
          >
            Edit Details
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Group gap="xs">
                <IconMapPin size={16} />
                <Text fw={500}>Location</Text>
              </Group>
              <Text size="sm">{getVenue.data?.address}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Group gap="xs">
                <IconClock size={16} />
                <Text fw={500}>Operating Hours</Text>
              </Group>
              <Text size="sm">
                {getVenue.data?.open_time
                  ? format(getVenue.data.open_time, "E")
                  : "N/A"}{" "}
                -{" "}
                {getVenue.data?.close_time
                  ? format(getVenue.data.close_time, "E")
                  : "N/A"}
                {": "}
                {getVenue.data?.open_time
                  ? format(getVenue.data.open_time, "HH:mm")
                  : "N/A"}
                -{" "}
                {getVenue.data?.close_time
                  ? format(getVenue.data.close_time, "HH:mm")
                  : "N/A"}
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Courts List */}
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <div>
            <Title order={4}>Courts Management</Title>
            <Text size="sm" c="dimmed">
              {getVenue.data?.name}
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={() => setAddCourtOpen(true)}
          >
            Add Court
          </Button>
        </Group>

        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Court</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {getVenue.data?.courts.map((court) => (
              <Table.Tr key={court.id}>
                <Table.Td>
                  <Text fw={500}>{court.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={getCourtStatusMap(court.status)?.color}>
                    {court.status}
                  </Badge>
                </Table.Td>
                <Table.Td>{court.price_per_hour}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Menu position="bottom-end" withinPortal>
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          onClick={() => {
                            setEditCourt({
                              ...court,
                              court_id: court.id,
                            });
                            setEditCourtOpen(true);
                          }}
                          leftSection={<IconEdit size={14} />}
                        >
                          Edit Court
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          onClick={() =>
                            onDeleteCourt({
                              ...court,
                              court_id: court.id,
                            })
                          }
                          leftSection={<IconTrash size={14} />}
                        >
                          Disable Court
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );

  return (
    <Container fluid>
      {renderOverview()}

      {/* Edit Venue Modal */}
      <Modal
        opened={editVenueOpen}
        onClose={() => setEditVenueOpen(false)}
        title="Edit Venue Details"
        size="lg"
      >
        {getVenue.data && (
          <VenueForm
            type="edit"
            onFinish={onEditVenue}
            data={{
              ...getVenue.data,
              name: getVenue.data?.name ?? "",
              description: getVenue.data?.description ?? "",
              address: getVenue.data?.address ?? "",
              phone: getVenue.data?.phone ?? "",
              email: getVenue.data?.email ?? "",
              image_urls: getVenue.data?.image_urls ?? "",
              status: getVenue.data?.status ?? "",
              open_time: format(getVenue.data?.open_time ?? "", "HH:mm"),
              close_time: format(getVenue.data?.close_time ?? "", "HH:mm"),
            }}
          />
        )}
      </Modal>

      <Modal
        opened={addCourtOpen}
        onClose={() => setAddCourtOpen(false)}
        title="Add New Court"
      >
        <CourtForm
          isLoading={addCourt.isPending}
          onFinish={onAddCourt}
          type="create"
        />
      </Modal>

      <Modal
        opened={editCourtOpen}
        onClose={() => setEditCourtOpen(false)}
        title="Edit Court Details"
      >
        <CourtForm
          isLoading={updateCourt.isPending}
          onFinish={onEditCourt}
          type="edit"
          data={EditCourt ?? undefined}
        />
      </Modal>
    </Container>
  );
}

export const dynamic = "force-dynamic";
