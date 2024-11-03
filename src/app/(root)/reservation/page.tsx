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
  Card,
  ActionIcon,
  Button,
  Badge,
  Table,
  Modal,
  TextInput,
  Select,
  Tabs,
  ThemeIcon,
  Menu,
  NumberInput,
  Textarea,
  Avatar,
  Indicator,
  ScrollArea,
  SegmentedControl,
} from "@mantine/core";
import { TimeInput, Calendar } from "@mantine/dates";
import {
  IconCalendarEvent,
  IconClock,
  IconCheck,
  IconX,
  IconCash,
  IconDotsVertical,
  IconEdit,
  IconMessage,
  IconFilter,
  IconRotate,
  IconCalendarStats,
  IconList,
} from "@tabler/icons-react";

const BookingManagement = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [addBookingOpen, setAddBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("day");

  // Sample booking data
  const Reservations = [
    {
      id: "1",
      court: "Court A",
      customer: {
        name: "John Doe",
        avatar: "/api/placeholder/32/32",
        phone: "+66812345678",
      },
      date: "2024-02-25",
      time: "18:00 - 20:00",
      status: "confirmed",
      payment: "paid",
      amount: "800",
    },
    {
      id: "2",
      court: "Court B",
      customer: {
        name: "Jane Smith",
        avatar: "/api/placeholder/32/32",
        phone: "+66887654321",
      },
      date: "2024-02-25",
      time: "19:00 - 21:00",
      status: "pending",
      payment: "pending",
      amount: "800",
    },
  ];

  const renderCalendarView = () => (
    <Stack>
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Stack gap={0}>
            <Title order={4}>Booking Calendar</Title>
            <Text size="sm" c="dimmed">
              Manage court Reservations
            </Text>
          </Stack>
          <Group>
            <SegmentedControl
              value={viewMode}
              onChange={setViewMode}
              data={[
                { label: "Day", value: "day" },
                { label: "Week", value: "week" },
                { label: "Month", value: "month" },
              ]}
            />
            <Button
              leftSection={<IconCalendarEvent size={16} />}
              onClick={() => setAddBookingOpen(true)}
            >
              New Booking
            </Button>
          </Group>
        </Group>

        <Grid>
          {/* Calendar Navigation */}
          <Grid.Col span={3}>
            <Paper withBorder p="md">
              <Calendar size="sm" />

              <Stack mt="md">
                <Text fw={500} size="sm">
                  Courts
                </Text>
                {["Court A", "Court B", "Court C"].map((court) => (
                  <Group key={court}>
                    <Indicator size={8} color="green" />
                    <Text size="sm">{court}</Text>
                  </Group>
                ))}
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Time Slots */}
          <Grid.Col span={9}>
            <ScrollArea>
              <Paper withBorder p="md">
                <Stack>
                  {/* Time slots header */}
                  <Group>
                    <div style={{ width: 100 }}>
                      <Text size="sm" fw={500}>
                        Time
                      </Text>
                    </div>
                    {["Court A", "Court B", "Court C"].map((court) => (
                      <div key={court} style={{ flex: 1 }}>
                        <Text size="sm" fw={500}>
                          {court}
                        </Text>
                      </div>
                    ))}
                  </Group>

                  {/* Time slots */}
                  {Array.from({ length: 15 }, (_, i) => {
                    const hour = 7 + i;
                    return (
                      <Group key={hour} align="flex-start">
                        <div style={{ width: 100 }}>
                          <Text size="sm">{`${hour}:00`}</Text>
                        </div>
                        {["Court A", "Court B", "Court C"].map((court) => (
                          <Paper
                            key={court}
                            withBorder
                            p="xs"
                            style={{ flex: 1, minHeight: 60 }}
                          >
                            {/* Sample booking */}
                            {hour === 18 && court === "Court A" && (
                              <Card withBorder p="xs" bg="blue.0">
                                <Text size="xs" fw={500}>
                                  John Doe
                                </Text>
                                <Text size="xs" c="dimmed">
                                  18:00 - 20:00
                                </Text>
                              </Card>
                            )}
                          </Paper>
                        ))}
                      </Group>
                    );
                  })}
                </Stack>
              </Paper>
            </ScrollArea>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );

  const renderReservationsList = () => (
    <Stack>
      {/* Filters */}
      <Paper p="md" withBorder>
        <Grid align="flex-end">
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <TextInput
              placeholder="Search Reservations..."
              leftSection={<IconFilter size={16} />}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="Status"
              data={[
                { value: "all", label: "All Status" },
                { value: "confirmed", label: "Confirmed" },
                { value: "pending", label: "Pending" },
                { value: "cancelled", label: "Cancelled" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="Court"
              data={[
                { value: "all", label: "All Courts" },
                { value: "court-a", label: "Court A" },
                { value: "court-b", label: "Court B" },
                { value: "court-c", label: "Court C" },
              ]}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              placeholder="Date Range"
              data={[
                { value: "today", label: "Today" },
                { value: "tomorrow", label: "Tomorrow" },
                { value: "week", label: "This Week" },
                { value: "month", label: "This Month" },
              ]}
            />
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Reservations Table */}
      <Paper withBorder>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Court</Table.Th>
              <Table.Th>Date & Time</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Payment</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {Reservations.map((booking) => (
              <Table.Tr key={booking.id}>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar src={booking.customer.avatar} radius="xl" />
                    <div>
                      <Text size="sm">{booking.customer.name}</Text>
                      <Text size="xs" c="dimmed">
                        {booking.customer.phone}
                      </Text>
                    </div>
                  </Group>
                </Table.Td>
                <Table.Td>{booking.court}</Table.Td>
                <Table.Td>
                  <Stack gap={4}>
                    <Text size="sm">{booking.date}</Text>
                    <Text size="xs" c="dimmed">
                      {booking.time}
                    </Text>
                  </Stack>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={
                      booking.status === "confirmed"
                        ? "green"
                        : booking.status === "pending"
                          ? "yellow"
                          : "red"
                    }
                  >
                    {booking.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={booking.payment === "paid" ? "green" : "yellow"}
                  >
                    {booking.payment}
                  </Badge>
                </Table.Td>
                <Table.Td>฿{booking.amount}</Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Menu position="bottom-end" withinPortal>
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <IconDotsVertical size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Booking</Menu.Label>
                        <Menu.Item leftSection={<IconEdit size={14} />}>
                          Edit Booking
                        </Menu.Item>
                        <Menu.Item leftSection={<IconMessage size={14} />}>
                          Contact Customer
                        </Menu.Item>
                        <Menu.Item leftSection={<IconRotate size={14} />}>
                          Reschedule
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Label>Actions</Menu.Label>
                        <Menu.Item
                          color="green"
                          leftSection={<IconCheck size={14} />}
                        >
                          Confirm Booking
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={<IconX size={14} />}
                        >
                          Cancel Booking
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
      <Stack>
        {/* Header with Statistics */}
        <Grid>
          {[
            {
              title: "Today's Reservations",
              value: "12",
              icon: IconCalendarEvent,
              color: "blue",
            },
            {
              title: "Pending Confirmation",
              value: "3",
              icon: IconClock,
              color: "yellow",
            },
            {
              title: "Today's Revenue",
              value: "฿4,800",
              icon: IconCash,
              color: "green",
            },
            {
              title: "Court Utilization",
              value: "75%",
              icon: IconCalendarStats,
              color: "grape",
            },
          ].map((stat, index) => (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
              <Card p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <ThemeIcon
                    size="lg"
                    radius="md"
                    variant="light"
                    color={stat.color}
                  >
                    <stat.icon size={20} />
                  </ThemeIcon>
                </Group>
                <Text fw={700} size="xl">
                  {stat.value}
                </Text>
                <Text size="sm" c="dimmed">
                  {stat.title}
                </Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value ?? "calendar")}
        >
          <Tabs.List>
            <Tabs.Tab
              value="calendar"
              leftSection={<IconCalendarEvent size={16} />}
            >
              Calendar View
            </Tabs.Tab>
            <Tabs.Tab value="list" leftSection={<IconList size={16} />}>
              List View
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="calendar" pt="md">
            {renderCalendarView()}
          </Tabs.Panel>

          <Tabs.Panel value="list" pt="md">
            {renderReservationsList()}
          </Tabs.Panel>
        </Tabs>
      </Stack>

      {/* Add Booking Modal */}
      <Modal
        opened={addBookingOpen}
        onClose={() => setAddBookingOpen(false)}
        title="New Booking"
        size="lg"
      >
        <Stack>
          <Select
            label="Court"
            placeholder="Select court"
            data={[
              { value: "court-a", label: "Court A" },
              { value: "court-b", label: "Court B" },
              { value: "court-c", label: "Court C" },
            ]}
            required
          />

          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Customer Name"
                placeholder="Enter name"
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone Number"
                placeholder="Enter phone"
                required
              />
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={6}>
              <TimeInput label="Start Time" required />
            </Grid.Col>
            <Grid.Col span={6}>
              <TimeInput label="End Time" required />
            </Grid.Col>
          </Grid>

          <NumberInput
            label="Amount"
            placeholder="Enter amount"
            prefix="฿"
            required
          />

          <Select
            label="Payment Status"
            data={[
              { value: "paid", label: "Paid" },
              { value: "pending", label: "Pending" },
            ]}
            required
          />

          <Textarea label="Notes" placeholder="Add any additional notes" />

          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={() => setAddBookingOpen(false)}>
              Cancel
            </Button>
            <Button>Create Booking</Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default BookingManagement;
