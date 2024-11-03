'use client'
import React, { useState } from 'react';
import {
    Container, Stack, Paper, Title, Text, Group, Grid, Card,
    ActionIcon, Button, Badge, Table, Tabs, ThemeIcon,
    Select, Menu, ScrollArea, Accordion, Progress, SegmentedControl
} from '@mantine/core';
import {
    IconCash, IconArrowUpRight, IconArrowDownRight, IconDownload,
    IconDotsVertical, IconChartBar, IconReceipt, IconCoins,
    IconCalendarStats, IconFileAnalytics,
    IconChevronRight, IconWallet, IconCreditCard, IconCheck
} from '@tabler/icons-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const FinancialManagement = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [periodFilter, setPeriodFilter] = useState('7d');
    const [paymentFilter, setPaymentFilter] = useState('all');

    // Sample data for charts
    const revenueData = [
        { date: '2024-02-20', revenue: 12000, Reservations: 15 },
        { date: '2024-02-21', revenue: 15000, Reservations: 18 },
        { date: '2024-02-22', revenue: 10000, Reservations: 12 },
        { date: '2024-02-23', revenue: 18000, Reservations: 20 },
        { date: '2024-02-24', revenue: 20000, Reservations: 22 },
        { date: '2024-02-25', revenue: 16000, Reservations: 17 },
        { date: '2024-02-26', revenue: 14000, Reservations: 16 }
    ];

    const courtRevenueData = [
        { name: 'Court A', revenue: 45000 },
        { name: 'Court B', revenue: 38000 },
        { name: 'Court C', revenue: 42000 },
    ];

    // Sample transactions
    const transactions = [
        {
            id: '1',
            date: '2024-02-26',
            customer: 'John Doe',
            type: 'booking',
            amount: 800,
            status: 'completed',
            paymentMethod: 'credit_card'
        },
        {
            id: '2',
            date: '2024-02-26',
            customer: 'Jane Smith',
            type: 'booking',
            amount: 1200,
            status: 'pending',
            paymentMethod: 'bank_transfer'
        }
    ];

    const renderOverview = () => (
        <Stack>
            {/* Key Statistics */}
            <Grid>
                {[
                    { title: 'Today\'s Revenue', value: '฿12,450', change: '+12.5%', icon: IconCash, color: 'green' },
                    { title: 'Monthly Revenue', value: '฿245,800', change: '+8.2%', icon: IconWallet, color: 'blue' },
                    { title: 'Average Daily Revenue', value: '฿15,320', change: '+5.3%', icon: IconChartBar, color: 'violet' },
                    { title: 'Pending Payments', value: '฿3,200', change: '-2.1%', icon: IconReceipt, color: 'orange' },
                ].map((stat, index) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
                        <Card p="md" radius="md" withBorder>
                            <Group justify="space-between" mb="xs">
                                <ThemeIcon size="lg" radius="md" variant="light" color={stat.color}>
                                    <stat.icon size={20} />
                                </ThemeIcon>
                                <Badge
                                    variant="light"
                                    color={stat.change.startsWith('+') ? 'green' : 'red'}
                                >
                                    {stat.change}
                                </Badge>
                            </Group>
                            <Text fw={700} size="xl">{stat.value}</Text>
                            <Text size="sm" c="dimmed">{stat.title}</Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Revenue Chart */}
            <Paper p="md" withBorder>
                <Group justify="space-between" mb="lg">
                    <div>
                        <Title order={4}>Revenue Overview</Title>
                        <Text size="sm" c="dimmed">Daily revenue and Reservations</Text>
                    </div>
                    <Group>
                        <SegmentedControl
                            value={periodFilter}
                            onChange={setPeriodFilter}
                            data={[
                                { label: '7D', value: '7d' },
                                { label: '30D', value: '30d' },
                                { label: '3M', value: '3m' },
                                { label: 'YTD', value: 'ytd' },
                            ]}
                        />
                        <Menu>
                            <Menu.Target>
                                <Button variant="light" leftSection={<IconDownload size={16} />}>
                                    Export
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item>Export as PDF</Menu.Item>
                                <Menu.Item>Export as CSV</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>

                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#228be6"
                                name="Revenue (฿)"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="Reservations"
                                stroke="#40c057"
                                name="Reservations"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Paper>

            {/* Revenue by Court */}
            <Paper p="md" withBorder>
                <Title order={4} mb="lg">Revenue by Court</Title>
                <div style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={courtRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#228be6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Paper>
        </Stack>
    );

    const renderTransactions = () => (
        <Stack>
            {/* Filters */}
            <Paper p="md" withBorder>
                <Grid align="flex-end">
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Select
                            placeholder="Payment Status"
                            data={[
                                { value: 'all', label: 'All Status' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'pending', label: 'Pending' },
                                { value: 'failed', label: 'Failed' },
                            ]}
                            value={paymentFilter}
                            onChange={(value) => setPaymentFilter(value ?? 'all')}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Select
                            placeholder="Payment Method"
                            data={[
                                { value: 'all', label: 'All Methods' },
                                { value: 'credit_card', label: 'Credit Card' },
                                { value: 'bank_transfer', label: 'Bank Transfer' },
                                { value: 'cash', label: 'Cash' },
                            ]}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                        <Select
                            placeholder="Date Range"
                            data={[
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This Week' },
                                { value: 'month', label: 'This Month' },
                                { value: 'custom', label: 'Custom Range' },
                            ]}
                        />
                    </Grid.Col>
                </Grid>
            </Paper>

            {/* Transactions Table */}
            <Paper withBorder>
                <ScrollArea>
                    <Table striped highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Date</Table.Th>
                                <Table.Th>Customer</Table.Th>
                                <Table.Th>Type</Table.Th>
                                <Table.Th>Amount</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Payment Method</Table.Th>
                                <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {transactions.map((transaction) => (
                                <Table.Tr key={transaction.id}>
                                    <Table.Td>{transaction.date}</Table.Td>
                                    <Table.Td>{transaction.customer}</Table.Td>
                                    <Table.Td>
                                        <Badge variant="light">
                                            {transaction.type}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>฿{transaction.amount}</Table.Td>
                                    <Table.Td>
                                        <Badge
                                            color={
                                                transaction.status === 'completed' ? 'green' :
                                                    transaction.status === 'pending' ? 'yellow' : 'red'
                                            }
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <Group gap="xs">
                                            <IconCreditCard size={16} />
                                            <Text size="sm">
                                                {transaction.paymentMethod.replace('_', ' ')}
                                            </Text>
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>
                                        <Menu position="bottom-end" withinPortal>
                                            <Menu.Target>
                                                <ActionIcon variant="subtle">
                                                    <IconDotsVertical size={16} />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item leftSection={<IconReceipt size={14} />}>
                                                    View Receipt
                                                </Menu.Item>
                                                <Menu.Item leftSection={<IconCheck size={14} />}>
                                                    Mark as Paid
                                                </Menu.Item>
                                                <Menu.Item leftSection={<IconDownload size={14} />}>
                                                    Download Invoice
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </Stack>
    );

    const renderReports = () => (
        <Stack>
            <Accordion>
                {/* Daily Report */}
                <Accordion.Item value="daily">
                    <Accordion.Control icon={<IconCalendarStats size={20} />}>
                        Daily Summary Report
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Grid>
                            <Grid.Col span={6}>
                                <Stack>
                                    <Text fw={500}>Revenue Breakdown</Text>
                                    <Table>
                                        <Table.Tbody>
                                            <Table.Tr>
                                                <Table.Td>Total Revenue</Table.Td>
                                                <Table.Td align="right">฿12,450</Table.Td>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Td>Total Reservations</Table.Td>
                                                <Table.Td align="right">15</Table.Td>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Td>Average Per Booking</Table.Td>
                                                <Table.Td align="right">฿830</Table.Td>
                                            </Table.Tr>
                                        </Table.Tbody>
                                    </Table>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Stack>
                                    <Text fw={500}>Payment Methods</Text>
                                    <Stack gap="xs">
                                        <div>
                                            <Group justify="space-between" mb={5}>
                                                <Text size="sm">Credit Card</Text>
                                                <Text size="sm">65%</Text>
                                            </Group>
                                            <Progress value={65} size="sm" />
                                        </div>
                                        <div>
                                            <Group justify="space-between" mb={5}>
                                                <Text size="sm">Bank Transfer</Text>
                                                <Text size="sm">25%</Text>
                                            </Group>
                                            <Progress value={25} size="sm" />
                                        </div>
                                        <div>
                                            <Group justify="space-between" mb={5}>
                                                <Text size="sm">Cash</Text>
                                                <Text size="sm">10%</Text>
                                            </Group>
                                            <Progress value={10} size="sm" />
                                        </div>
                                    </Stack>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Accordion.Panel>
                </Accordion.Item>

                {/* Monthly Report */}
                <Accordion.Item value="monthly">
                    <Accordion.Control icon={<IconFileAnalytics size={20} />}>
                        Monthly Analysis Report
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Grid>
                            <Grid.Col span={12}>
                                <Stack>
                                    <Text fw={500}>Monthly Performance</Text>
                                    <Table>
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Th>Metric</Table.Th>
                                                <Table.Th align="right">Value</Table.Th>
                                                <Table.Th align="right">Change</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            <Table.Tr>
                                                <Table.Td>Total Revenue</Table.Td>
                                                <Table.Td align="right">฿245,800</Table.Td>
                                                <Table.Td align="right">
                                                    <Badge color="green">+8.2%</Badge>
                                                </Table.Td>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Td>Total Reservations</Table.Td>
                                                <Table.Td align="right">320</Table.Td>
                                                <Table.Td align="right">
                                                    <Badge color="green">+12.5%</Badge>
                                                </Table.Td>
                                            </Table.Tr><Table.Tr>
                                                <Table.Td>Average Court Utilization</Table.Td>
                                                <Table.Td align="right">75%</Table.Td>
                                                <Table.Td align="right">
                                                    <Badge color="green">+5.3%</Badge>
                                                </Table.Td>
                                            </Table.Tr>
                                            <Table.Tr>
                                                <Table.Td>Cancellation Rate</Table.Td>
                                                <Table.Td align="right">3.2%</Table.Td>
                                                <Table.Td align="right">
                                                    <Badge color="green">-1.5%</Badge>
                                                </Table.Td>
                                            </Table.Tr>
                                        </Table.Tbody>
                                    </Table>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Accordion.Panel>
                </Accordion.Item>

                {/* Tax Report */}
                <Accordion.Item value="tax">
                    <Accordion.Control icon={<IconCoins size={20} />}>
                        Tax & Financial Statements
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Paper p="md" withBorder>
                                        <Stack>
                                            <Text fw={500}>Tax Summary</Text>
                                            <Table>
                                                <Table.Tbody>
                                                    <Table.Tr>
                                                        <Table.Td>Total Revenue (Before Tax)</Table.Td>
                                                        <Table.Td align="right">฿245,800</Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>VAT (7%)</Table.Td>
                                                        <Table.Td align="right">฿17,206</Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>Net Revenue</Table.Td>
                                                        <Table.Td align="right">฿228,594</Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                            <Button
                                                variant="light"
                                                leftSection={<IconDownload size={16} />}
                                            >
                                                Download Tax Report
                                            </Button>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Paper p="md" withBorder>
                                        <Stack>
                                            <Text fw={500}>Financial Documents</Text>
                                            <Table>
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th>Document</Table.Th>
                                                        <Table.Th>Period</Table.Th>
                                                        <Table.Th>Action</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    <Table.Tr>
                                                        <Table.Td>Monthly Statement</Table.Td>
                                                        <Table.Td>Feb 2024</Table.Td>
                                                        <Table.Td>
                                                            <Button variant="light" size="xs">
                                                                Download
                                                            </Button>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                    <Table.Tr>
                                                        <Table.Td>Tax Invoice Summary</Table.Td>
                                                        <Table.Td>Feb 2024</Table.Td>
                                                        <Table.Td>
                                                            <Button variant="light" size="xs">
                                                                Download
                                                            </Button>
                                                        </Table.Td>
                                                    </Table.Tr>
                                                </Table.Tbody>
                                            </Table>
                                        </Stack>
                                    </Paper>
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>

                {/* Revenue Analysis */}
                <Accordion.Item value="analysis">
                    <Accordion.Control icon={<IconChartBar size={20} />}>
                        Revenue Analysis
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Grid>
                            <Grid.Col span={6}>
                                <Paper p="md" withBorder>
                                    <Stack>
                                        <Text fw={500}>Revenue by Time Slot</Text>
                                        <div style={{ height: 200 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={[
                                                    { time: '7-9', revenue: 15000 },
                                                    { time: '9-12', revenue: 12000 },
                                                    { time: '12-15', revenue: 8000 },
                                                    { time: '15-18', revenue: 18000 },
                                                    { time: '18-21', revenue: 25000 },
                                                ]}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="time" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="revenue" fill="#228be6" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper p="md" withBorder>
                                    <Stack>
                                        <Text fw={500}>Revenue by Day of Week</Text>
                                        <div style={{ height: 200 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={[
                                                    { day: 'Mon', revenue: 35000 },
                                                    { day: 'Tue', revenue: 32000 },
                                                    { day: 'Wed', revenue: 30000 },
                                                    { day: 'Thu', revenue: 34000 },
                                                    { day: 'Fri', revenue: 38000 },
                                                    { day: 'Sat', revenue: 45000 },
                                                    { day: 'Sun', revenue: 42000 },
                                                ]}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="day" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar dataKey="revenue" fill="#40c057" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Stack>
                                </Paper>
                            </Grid.Col>
                        </Grid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    );

    return (
        <Container fluid>
            <Stack>
                {/* Header */}
                <Paper p="md" withBorder>
                    <Group justify="space-between">
                        <Stack gap={0}>
                            <Title order={2}>Financial Management</Title>
                            <Text c="dimmed">Track revenue and manage payments</Text>
                        </Stack>
                        <Group>
                            <Button
                                leftSection={<IconDownload size={20} />}
                                variant="light"
                            >
                                Export Reports
                            </Button>
                        </Group>
                    </Group>
                </Paper>

                {/* Main Content */}
                <Tabs value={activeTab} onChange={(value) => setActiveTab(value ?? 'overview')}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="overview"
                            leftSection={<IconChartBar size={16} />}
                        >
                            Overview
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="transactions"
                            leftSection={<IconReceipt size={16} />}
                        >
                            Transactions
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="reports"
                            leftSection={<IconFileAnalytics size={16} />}
                        >
                            Reports
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="overview" pt="md">
                        {renderOverview()}
                    </Tabs.Panel>

                    <Tabs.Panel value="transactions" pt="md">
                        {renderTransactions()}
                    </Tabs.Panel>

                    <Tabs.Panel value="reports" pt="md">
                        {renderReports()}
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </Container>
    );
};

export default FinancialManagement;