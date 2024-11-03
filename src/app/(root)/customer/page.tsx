'use client'

import React, { useState } from 'react';
import {
    Container, Stack, Paper, Title, Text, Group, Grid, Card,
    ActionIcon, Button, Badge, Table, Tabs, ThemeIcon, Avatar,
    Select, Menu, TextInput, Modal, Progress, ScrollArea,
    Indicator, Timeline, List, Drawer, Switch
} from '@mantine/core';
import {
    IconUsers, IconSearch, IconFilter, IconDownload, IconUserPlus,
    IconMail, IconPhone, IconMapPin, IconCalendarEvent, IconChartBar,
    IconMessage, IconStar, IconHistory, IconBan, IconUserCheck,
    IconDotsVertical, IconEdit, IconTrash, IconSend, IconAlertCircle,
    IconChevronRight, IconUserCircle, IconCreditCard
} from '@tabler/icons-react';

const CustomerManagement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
    const [addCustomerOpen, setAddCustomerOpen] = useState(false);
    const [blacklistModalOpen, setBlacklistModalOpen] = useState(false);

    // Sample customer data
    const customers = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+66812345678',
            level: 'gold',
            totalReservations: 45,
            totalSpent: 36000,
            joinDate: '2024-01-15',
            lastBooking: '2024-02-20',
            status: 'active',
            avatar: '/api/placeholder/32/32'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+66823456789',
            level: 'silver',
            totalReservations: 28,
            totalSpent: 22400,
            joinDate: '2024-01-20',
            lastBooking: '2024-02-18',
            status: 'active',
            avatar: '/api/placeholder/32/32'
        }
    ];

    const customerLevels = {
        gold: { color: 'yellow', label: 'Gold Member' },
        silver: { color: 'gray', label: 'Silver Member' },
        bronze: { color: 'brown', label: 'Bronze Member' },
        new: { color: 'blue', label: 'New Customer' }
    };

    const renderOverview = () => (
        <Stack>
            {/* Statistics Cards */}
            <Grid>
                {[
                    { title: 'Total Customers', value: '248', icon: IconUsers, color: 'blue' },
                    { title: 'Active Last 30 Days', value: '185', icon: IconUserCheck, color: 'green' },
                    { title: 'New This Month', value: '32', icon: IconUserPlus, color: 'violet' },
                    { title: 'Avg. Customer Value', value: '฿8,450', icon: IconChartBar, color: 'orange' },
                ].map((stat, index) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                        <Card p="md" radius="md" withBorder>
                            <Group justify="space-between" mb="xs">
                                <ThemeIcon size="lg" radius="md" variant="light" color={stat.color}>
                                    <stat.icon size={20} />
                                </ThemeIcon>
                            </Group>
                            <Text fw={700} size="xl">{stat.value}</Text>
                            <Text size="sm" c="dimmed">{stat.title}</Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Filters */}
            <Paper p="md" withBorder>
                <Grid align="flex-end">
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <TextInput
                            placeholder="Search customers..."
                            leftSection={<IconSearch size={16} />}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Select
                            placeholder="Membership Level"
                            data={[
                                { value: 'all', label: 'All Levels' },
                                { value: 'gold', label: 'Gold' },
                                { value: 'silver', label: 'Silver' },
                                { value: 'bronze', label: 'Bronze' },
                                { value: 'new', label: 'New Customer' },
                            ]}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Select
                            placeholder="Status"
                            data={[
                                { value: 'all', label: 'All Status' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'blacklisted', label: 'Blacklisted' },
                            ]}
                        />
                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Customers Table */}
            <Paper withBorder>
                <ScrollArea>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Customer</Table.Th>
                                <Table.Th>Level</Table.Th>
                                <Table.Th>Total Reservations</Table.Th>
                                <Table.Th>Total Spent</Table.Th>
                                <Table.Th>Last Booking</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {customers.map((customer) => (
                                <Table.Tr key={customer.id}>
                                    <Table.Td>
                                        <Group gap="sm">
                                            <Avatar src={customer.avatar} radius="xl" />
                                            <div>
                                                <Text size="sm" fw={500}>{customer.name}</Text>
                                                <Text size="xs" c="dimmed">{customer.email}</Text>
                                            </div>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Badge color={customerLevels[customer.level].color}>
                                            {customerLevels[customer.level].label}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>{customer.totalReservations}</Table.Td>
                                    <Table.Td>฿{customer.totalSpent.toLocaleString()}</Table.Td>
                                    <Table.Td>{customer.lastBooking}</Table.Td>
                                    <Table.Td>
                                        <Badge
                                            color={customer.status === 'active' ? 'green' : 'red'}
                                        >
                                            {customer.status}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <ActionIcon
                                                variant="light"
                                                onClick={() => {
                                                    setSelectedCustomer(customer);
                                                    setCustomerDetailsOpen(true);
                                                }}
                                            >
                                                <IconChartBar size={16} />
                                            </ActionIcon>
                                            <Menu position="bottom-end" withinPortal>
                                                <Menu.Target>
                                                    <ActionIcon variant="subtle">
                                                        <IconDotsVertical size={16} />
                                                    </ActionIcon>
                                                </Menu.Target>
                                                <Menu.Dropdown>
                                                    <Menu.Label>Customer</Menu.Label>
                                                    <Menu.Item leftSection={<IconEdit size={14} />}>
                                                        Edit Details
                                                    </Menu.Item>
                                                    <Menu.Item leftSection={<IconMessage size={14} />}>
                                                        Send Message
                                                    </Menu.Item>
                                                    <Menu.Item leftSection={<IconHistory size={14} />}>
                                                        View History
                                                    </Menu.Item>
                                                    <Menu.Divider />
                                                    <Menu.Label>Membership</Menu.Label>
                                                    <Menu.Item leftSection={<IconStar size={14} />}>
                                                        Update Level
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        color="red"
                                                        leftSection={<IconBan size={14} />}
                                                        onClick={() => {
                                                            setSelectedCustomer(customer);
                                                            setBlacklistModalOpen(true);
                                                        }}
                                                    >
                                                        Blacklist Customer
                                                    </Menu.Item>
                                                </Menu.Dropdown>
                                            </Menu>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </Stack>
    );

    const renderCustomerProfile = () => {
        if (!selectedCustomer) return null;

        return (
            <Stack>
                {/* Basic Info */}
                <Paper p="md" withBorder>
                    <Group>
                        <Avatar src={selectedCustomer.avatar} size="xl" radius="xl" />
                        <div style={{ flex: 1 }}>
                            <Group justify="space-between">
                                <div>
                                    <Text size="xl" fw={500}>{selectedCustomer.name}</Text>
                                    <Badge color={customerLevels[selectedCustomer.level].color}>
                                        {customerLevels[selectedCustomer.level].label}
                                    </Badge>
                                </div>
                                <Group>
                                    <Button variant="light" leftSection={<IconMessage size={16} />}>
                                        Message
                                    </Button>
                                    <Button variant="light" leftSection={<IconEdit size={16} />}>
                                        Edit
                                    </Button>
                                </Group>
                            </Group>
                        </div>
                    </Group>
                </Paper>

                <Grid>
                    {/* Contact Details */}
                    <Grid.Col span={6}>
                        <Paper p="md" withBorder>
                            <Title order={4} mb="md">Contact Information</Title>
                            <Stack>
                                <Group>
                                    <IconMail size={16} />
                                    <Text>{selectedCustomer.email}</Text>
                                </Group>
                                <Group>
                                    <IconPhone size={16} />
                                    <Text>{selectedCustomer.phone}</Text>
                                </Group>
                                <Group>
                                    <IconMapPin size={16} />
                                    <Text>Bangkok, Thailand</Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* Membership Details */}
                    <Grid.Col span={6}>
                        <Paper p="md" withBorder>
                            <Title order={4} mb="md">Membership Details</Title>
                            <Stack>
                                <Group justify="space-between">
                                    <Text>Member Since</Text>
                                    <Text>{selectedCustomer.joinDate}</Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text>Total Reservations</Text>
                                    <Text>{selectedCustomer.totalReservations}</Text>
                                </Group>
                                <Group justify="space-between">
                                    <Text>Total Spent</Text>
                                    <Text>฿{selectedCustomer.totalSpent.toLocaleString()}</Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* Booking History */}
                    <Grid.Col span={12}>
                        <Paper p="md" withBorder>
                            <Title order={4} mb="md">Recent Reservations</Title>
                            <Timeline active={1}>
                                <Timeline.Item
                                    bullet={<IconCalendarEvent size={12} />}
                                    title="Court A Booking"
                                >
                                    <Text size="sm">2 hours session</Text>
                                    <Text size="xs" c="dimmed">2024-02-20 18:00</Text>
                                </Timeline.Item>
                                <Timeline.Item
                                    bullet={<IconCalendarEvent size={12} />}
                                    title="Court B Booking"
                                >
                                    <Text size="sm">1.5 hours session</Text>
                                    <Text size="xs" c="dimmed">2024-02-18 19:30</Text>
                                </Timeline.Item>
                            </Timeline>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        );
    };

    return (
        <Container fluid>
            <Stack>
                {/* Header */}
                <Paper p="md" withBorder>
                    <Group justify="space-between">
                        <Stack gap={0}>
                            <Title order={2}>Customer Management</Title>
                            <Text c="dimmed">Manage customer relationships and data</Text>
                        </Stack>
                        <Group>
                            <Button
                                variant="light"
                                leftSection={<IconUserPlus size={20} />}
                                onClick={() => setAddCustomerOpen(true)}
                            >
                                Add Customer
                            </Button>
                            <Button
                                variant="light"
                                leftSection={<IconDownload size={20} />}
                            >
                                Export
                            </Button>
                        </Group>
                    </Group>
                </Paper>

                {/* Main Content */}
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="overview"
                            leftSection={<IconUsers size={16} />}
                        >
                            Overview
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="segmentation"
                            leftSection={<IconChartBar size={16} />}
                        >
                            Segmentation
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="overview" pt="md">
                        {renderOverview()}
                    </Tabs.Panel>


                </Tabs>
            </Stack>

            {/* Customer Details Drawer */}
            <Drawer
                opened={customerDetailsOpen}
                onClose={() => setCustomerDetailsOpen(false)}
                position="right"
                size="xl"
                title="Customer Profile"
            >
                {renderCustomerProfile()}
            </Drawer>

            {/* Add Customer Modal */}
            <Modal
                opened={addCustomerOpen}
                onClose={() => setAddCustomerOpen(false)}
                title="Add New Customer"
                size="lg"
            >
                <Stack>
                    <TextInput
                        label="Full Name"
                        placeholder="Enter customer name"
                        required
                    />
                    <TextInput
                        label="Email"
                        placeholder="Enter email address"
                        required
                    />
                    <TextInput
                        label="Phone Number"
                        placeholder="Enter phone number"
                        required
                    />
                    <Select
                        label="Membership Level"
                        placeholder="Select level"
                        data={[
                            { value: 'new', label: 'New Customer' },
                            { value: 'bronze', label: 'Bronze' },
                            { value: 'silver', label: 'Silver' },
                            { value: 'gold', label: 'Gold' },
                        ]}
                        required
                    />
                    <Group justify="flex-end" mt="md">
                        <Button variant="light" onClick={() => setAddCustomerOpen(false)}>
                            Cancel
                        </Button>
                        <Button>Add Customer</Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Blacklist Modal */}
            <Modal
                opened={blacklistModalOpen}
                onClose={() => setBlacklistModalOpen(false)}
                title={
                    <Group gap="xs">
                        <ThemeIcon color="red" variant="light">
                            <IconAlertCircle size={16} />
                        </ThemeIcon>
                        <Text fw={500}>Blacklist Customer</Text>
                    </Group>
                }
            >
                <Stack>
                    <Text size="sm">
                        Are you sure you want to blacklist this customer? This will:
                    </Text>
                    <List size="sm">
                        <List.Item>Cancel all upcoming Reservations</List.Item>
                        <List.Item>Prevent future Reservations</List.Item>
                        <List.Item>Send notification to the customer</List.Item>
                    </List>
                    <TextInput
                        label="Reason"
                        placeholder="Enter reason for blacklisting..."
                        required
                    />
                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="light"
                            onClick={() => setBlacklistModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button color="red">Confirm Blacklist</Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Customer Segmentation Analysis */}
            <Tabs.Panel value="segmentation" pt="md">
                <Stack>
                    {/* Membership Distribution */}
                    <Paper p="md" withBorder>
                        <Stack>
                            <Title order={4}>Membership Distribution</Title>
                            <Grid>
                                <Grid.Col span={8}>
                                    <div style={{ height: 300 }}>
                                        {/* Add pie chart for membership distribution */}
                                    </div>
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Stack>
                                        <Card withBorder>
                                            <Group justify="space-between">
                                                <Badge color="yellow">Gold</Badge>
                                                <Text>45 members</Text>
                                            </Group>
                                            <Progress value={25} mt="xs" color="yellow" />
                                        </Card>
                                        <Card withBorder>
                                            <Group justify="space-between">
                                                <Badge color="gray">Silver</Badge>
                                                <Text>78 members</Text>
                                            </Group>
                                            <Progress value={35} mt="xs" color="gray" />
                                        </Card>
                                        <Card withBorder>
                                            <Group justify="space-between">
                                                <Badge color="brown">Bronze</Badge>
                                                <Text>125 members</Text>
                                            </Group>
                                            <Progress value={40} mt="xs" color="brown" />
                                        </Card>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>

                    {/* Customer Behavior Analysis */}
                    <Grid>
                        <Grid.Col span={6}>
                            <Paper p="md" withBorder>
                                <Title order={4} mb="md">Booking Frequency</Title>
                                <Stack>
                                    <Group justify="space-between">
                                        <Text>Regular (8 times/month)</Text>
                                        <Badge>32 customers</Badge>
                                    </Group>
                                    <Progress value={35} size="sm" />

                                    <Group justify="space-between">
                                        <Text>Active (4-8 times/month)</Text>
                                        <Badge>85 customers</Badge>
                                    </Group>
                                    <Progress value={45} size="sm" />

                                    <Group justify="space-between">
                                        <Text>Occasional (1-3 times/month)</Text>
                                        <Badge>131 customers</Badge>
                                    </Group>
                                    <Progress value={20} size="sm" />
                                </Stack>
                            </Paper>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Paper p="md" withBorder>
                                <Title order={4} mb="md">Preferred Time Slots</Title>
                                <Stack>
                                    <Group justify="space-between">
                                        <Text>Morning (7-11)</Text>
                                        <Badge>25%</Badge>
                                    </Group>
                                    <Progress value={25} size="sm" />

                                    <Group justify="space-between">
                                        <Text>Afternoon (12-16)</Text>
                                        <Badge>15%</Badge>
                                    </Group>
                                    <Progress value={15} size="sm" />

                                    <Group justify="space-between">
                                        <Text>Evening (17-22)</Text>
                                        <Badge>60%</Badge>
                                    </Group>
                                    <Progress value={60} size="sm" />
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>

                    {/* Customer Retention */}
                    <Paper p="md" withBorder>
                        <Title order={4} mb="md">Customer Retention Analysis</Title>
                        <Grid>
                            <Grid.Col span={4}>
                                <Card withBorder>
                                    <Stack>
                                        <Text fw={500}>Customer Retention Rate</Text>
                                        <Text size="xl" fw={700}>85%</Text>
                                        <Progress value={85} size="sm" color="green" />
                                        <Text size="xs" c="dimmed">Based on last 3 months</Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Card withBorder>
                                    <Stack>
                                        <Text fw={500}>Average Customer Lifetime</Text>
                                        <Text size="xl" fw={700}>8.5 months</Text>
                                        <Text size="xs" c="dimmed">Active customers</Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <Card withBorder>
                                    <Stack>
                                        <Text fw={500}>Churn Rate</Text>
                                        <Text size="xl" fw={700}>5.2%</Text>
                                        <Progress value={5.2} size="sm" color="red" />
                                        <Text size="xs" c="dimmed">Last month</Text>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </Paper>

                    {/* Customer Value Analysis */}
                    <Paper p="md" withBorder>
                        <Title order={4} mb="md">Customer Value Analysis</Title>
                        <Grid>
                            <Grid.Col span={6}>
                                <Stack>
                                    <Text fw={500}>Average Spending per Visit</Text>
                                    <Card withBorder>
                                        <Group justify="space-between">
                                            <Stack gap={0}>
                                                <Text>Gold Members</Text>
                                                <Text size="sm" c="dimmed">฿850/visit</Text>
                                            </Stack>
                                            <ThemeIcon color="yellow" variant="light" size="lg">
                                                <IconCreditCard size={20} />
                                            </ThemeIcon>
                                        </Group>
                                    </Card>
                                    <Card withBorder>
                                        <Group justify="space-between">
                                            <Stack gap={0}>
                                                <Text>Silver Members</Text>
                                                <Text size="sm" c="dimmed">฿650/visit</Text>
                                            </Stack>
                                            <ThemeIcon color="gray" variant="light" size="lg">
                                                <IconCreditCard size={20} />
                                            </ThemeIcon>
                                        </Group>
                                    </Card>
                                    <Card withBorder>
                                        <Group justify="space-between">
                                            <Stack gap={0}>
                                                <Text>Bronze Members</Text>
                                                <Text size="sm" c="dimmed">฿500/visit</Text>
                                            </Stack>
                                            <ThemeIcon color="brown" variant="light" size="lg">
                                                <IconCreditCard size={20} />
                                            </ThemeIcon>
                                        </Group>
                                    </Card>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Card withBorder h="100%">
                                    <Stack>
                                        <Text fw={500}>Recommendations</Text>
                                        <List>
                                            <List.Item>Target evening slot customers with early bird promotions</List.Item>
                                            <List.Item>Implement loyalty program for regular customers</List.Item>
                                            <List.Item>Follow up with inactive customers from last month</List.Item>
                                            <List.Item>Promote membership upgrades to active bronze members</List.Item>
                                        </List>
                                    </Stack>
                                </Card>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Stack>
            </Tabs.Panel>
        </Container >
    );
};

export default CustomerManagement;