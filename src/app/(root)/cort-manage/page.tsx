'use client';

import React, { useState } from 'react';
import {
    Container,
    Grid,
    Card,
    Text,
    Badge,
    Button,
    Stack,
    Box,
    TextInput,
    Paper,
    Title,
    ActionIcon,
    Group,
    Select,
    Menu,
    Modal,
    NumberInput,
    ThemeIcon,
    MultiSelect,
    TimeInput
} from '@mantine/core';
import { IconCut, IconEdit, IconTrash, IconPlus, IconCalendarTime, IconSettings, IconSwitchHorizontal, IconCheck, IconX } from '@tabler/icons-react';

// Types
type CourtStatus = 'available' | 'occupied' | 'maintenance' | 'reserved';
type CourtType = 'indoor' | 'outdoor';
type SurfaceType = 'wood' | 'synthetic' | 'rubber' | 'concrete';

interface Court {
    id: string;
    name: string;
    type: CourtType;
    surface: SurfaceType;
    status: CourtStatus;
    hourlyRate: number;
    operatingHours: {
        start: string;
        end: string;
    };
    features: string[];
    maintenanceSchedule?: string;
    lastMaintenance?: string;
    maxPlayers: number;
    currentPlayers?: number;
}

interface CourtFormData {
    name: string;
    type: CourtType;
    surface: SurfaceType;
    hourlyRate: number;
    operatingHours: {
        start: string;
        end: string;
    };
    features: string[];
    maxPlayers: number;
}

// Constants
const INITIAL_COURTS: Court[] = [
    {
        id: '1',
        name: 'Court A1',
        type: 'indoor',
        surface: 'wood',
        status: 'available',
        hourlyRate: 500,
        operatingHours: {
            start: '08:00',
            end: '22:00',
        },
        features: ['lighting', 'air-con', 'scoreboard'],
        maxPlayers: 4,
        currentPlayers: 0,
    },
    {
        id: '2',
        name: 'Court A2',
        type: 'indoor',
        surface: 'synthetic',
        status: 'occupied',
        hourlyRate: 600,
        operatingHours: {
            start: '08:00',
            end: '22:00',
        },
        features: ['lighting', 'air-con', 'scoreboard', 'shower'],
        maxPlayers: 4,
        currentPlayers: 4,
    },
];

const INITIAL_FORM_DATA: CourtFormData = {
    name: '',
    type: 'indoor',
    surface: 'wood',
    hourlyRate: 0,
    operatingHours: {
        start: '08:00',
        end: '22:00',
    },
    features: [],
    maxPlayers: 4,
};

// Component - CourtCard
const CourtCard = ({
    court,
    onEdit,
    onToggleStatus,
    onDelete
}: {
    court: Court;
    onEdit: (court: Court) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
            <Group position="apart">
                <Text fw={500}>{court.name}</Text>
                <Menu withinPortal position="bottom-end" shadow="sm">
                    <Menu.Target>
                        <ActionIcon>
                            <IconSettings size={16} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item
                            icon={<IconEdit size={14} />}
                            onClick={() => onEdit(court)}
                        >
                            Edit
                        </Menu.Item>
                        <Menu.Item
                            icon={<IconSwitchHorizontal size={14} />}
                            onClick={() => onToggleStatus(court.id)}
                        >
                            Toggle Status
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="red"
                            icon={<IconTrash size={14} />}
                            onClick={() => onDelete(court.id)}
                        >
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Card.Section>

        <Stack spacing="xs" mt="md">
            <Group position="apart">
                <Text size="sm" c="dimmed">Type:</Text>
                <Badge>{court.type}</Badge>
            </Group>
            <Group position="apart">
                <Text size="sm" c="dimmed">Surface:</Text>
                <Badge color="cyan">{court.surface}</Badge>
            </Group>
            <Group position="apart">
                <Text size="sm" c="dimmed">Status:</Text>
                <Badge
                    color={
                        court.status === 'available' ? 'green' :
                            court.status === 'occupied' ? 'blue' :
                                court.status === 'maintenance' ? 'orange' : 'red'
                    }
                >
                    {court.status}
                </Badge>
            </Group>
            <Group position="apart">
                <Text size="sm" c="dimmed">Rate:</Text>
                <Text size="sm" fw={500}>฿{court.hourlyRate}/hr</Text>
            </Group>
            <Group position="apart">
                <Text size="sm" c="dimmed">Players:</Text>
                <Text size="sm">{court.currentPlayers || 0}/{court.maxPlayers}</Text>
            </Group>
            <Group position="apart">
                <Text size="sm" c="dimmed">Hours:</Text>
                <Text size="sm">{court.operatingHours.start} - {court.operatingHours.end}</Text>
            </Group>
            <Box>
                <Text size="sm" c="dimmed" mb="xs">Features:</Text>
                <Group spacing="xs">
                    {court.features.map(feature => (
                        <Badge key={feature} variant="dot">
                            {feature}
                        </Badge>
                    ))}
                </Group>
            </Box>
        </Stack>
    </Card>
);

// Component - StatCard
const StatCard = ({
    icon,
    title,
    value,
    color
}: {
    icon: React.ReactNode;
    title: string;
    value: number;
    color: string;
}) => (
    <Stack spacing="xs" align="center">
        <ThemeIcon
            size={40}
            radius="md"
            variant="light"
            color={color}
        >
            {icon}
        </ThemeIcon>
        <Text size="lg" fw={500}>{title}</Text>
        <Text size="xl" fw={700}>{value}</Text>
    </Stack>
);

export default function PageCortManageMent() {
    const [courts, setCourts] = useState<Court[]>(INITIAL_COURTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<CourtFormData>(INITIAL_FORM_DATA);
    const [editingCourtId, setEditingCourtId] = useState<string | null>(null);

    const handleAddCourt = () => {
        setFormData(INITIAL_FORM_DATA);
        setEditingCourtId(null);
        setIsModalOpen(true);
    };

    const handleEditCourt = (court: Court) => {
        setFormData({
            name: court.name,
            type: court.type,
            surface: court.surface,
            hourlyRate: court.hourlyRate,
            operatingHours: court.operatingHours,
            features: court.features,
            maxPlayers: court.maxPlayers,
        });
        setEditingCourtId(court.id);
        setIsModalOpen(true);
    };

    const handleSaveCourt = () => {
        if (editingCourtId) {
            setCourts(prev => prev.map(court =>
                court.id === editingCourtId
                    ? { ...court, ...formData }
                    : court
            ));
        } else {
            const newCourt: Court = {
                id: Math.random().toString(36).substr(2, 9),
                ...formData,
                status: 'available',
                currentPlayers: 0,
            };
            setCourts(prev => [...prev, newCourt]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteCourt = (id: string) => {
        setCourts(prev => prev.filter(court => court.id !== id));
    };

    const handleToggleCourtStatus = (id: string) => {
        setCourts(prev => prev.map(court =>
            court.id === id
                ? {
                    ...court,
                    status: court.status === 'available' ? 'maintenance' : 'available',
                }
                : court
        ));
    };

    const filteredCourts = courts.filter(court => {
        const matchesSearch = court.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(court.type);
        const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(court.status);
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <Box bg="gray.0" mih="100vh">
            <Container size="xl" py="xl">
                <Stack spacing="lg">
                    <Group position="apart">
                        <Title order={2}>Court Management</Title>
                        <Button
                            leftIcon={<IconPlus size={16} />}
                            onClick={handleAddCourt}
                        >
                            Add Court
                        </Button>
                    </Group>

                    <Paper p="md" radius="md" withBorder>
                        <Stack spacing="sm">
                            <Group grow>
                                <TextInput
                                    placeholder="Search courts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                                />
                                <MultiSelect
                                    placeholder="Filter by type"
                                    value={selectedTypes}
                                    onChange={setSelectedTypes}
                                    data={[
                                        { value: 'indoor', label: 'Indoor' },
                                        { value: 'outdoor', label: 'Outdoor' },
                                    ]}
                                    clearable
                                />
                                <MultiSelect
                                    placeholder="Filter by status"
                                    value={selectedStatus}
                                    onChange={setSelectedStatus}
                                    data={[
                                        { value: 'available', label: 'Available' },
                                        { value: 'occupied', label: 'Occupied' },
                                        { value: 'maintenance', label: 'Maintenance' },
                                        { value: 'reserved', label: 'Reserved' },
                                    ]}
                                    clearable
                                />
                            </Group>
                        </Stack>
                    </Paper>

                    <Grid>
                        {filteredCourts.map(court => (
                            <Grid.Col key={court.id} span={{ base: 12, sm: 6, md: 4 }}>
                                <CourtCard
                                    court={court}
                                    onEdit={handleEditCourt}
                                    onToggleStatus={handleToggleCourtStatus}
                                    onDelete={handleDeleteCourt}
                                />
                            </Grid.Col>
                        ))}
                    </Grid>

                    <Modal
                        opened={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={editingCourtId ? 'Edit Court' : 'Add New Court'}
                        size="lg"
                    >
                        <Stack spacing="md">
                            <TextInput
                                label="Court Name"
                                placeholder="Enter court name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    name: e.currentTarget.value,
                                }))}
                                required
                            />
                            <Select
                                label="Court Type"
                                value={formData.type}
                                onChange={(value: any) => setFormData(prev => ({
                                    ...prev,
                                    type: value as CourtType,
                                }))}
                                data={[
                                    { value: 'indoor', label: 'Indoor' },
                                    { value: 'outdoor', label: 'Outdoor' },
                                ]}
                                required
                            />
                            <Select
                                label="Surface Type"
                                value={formData.surface}
                                onChange={(value: any) => setFormData(prev => ({
                                    ...prev,
                                    surface: value as SurfaceType,
                                }))}
                                data={[
                                    { value: 'wood', label: 'Wood' },
                                    { value: 'synthetic', label: 'Synthetic' },
                                    { value: 'rubber', label: 'Rubber' },
                                    { value: 'concrete', label: 'Concrete' },
                                ]}
                                required
                            />
                            <NumberInput
                                label="Hourly Rate (฿)"
                                value={formData.hourlyRate}
                                onChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    hourlyRate: value || 0,
                                }))}
                                min={0}
                                required
                            />
                            <Group grow>
                                <TimeInput
                                    label="Opening Time"
                                    value={formData.operatingHours.start}
                                    onChange={(event) => setFormData(prev => ({
                                        ...prev,
                                        operatingHours: {
                                            ...prev.operatingHours,
                                            start: event.currentTarget.value,
                                        },
                                    }))}
                                />
                                <TimeInput
                                    label="Closing Time"
                                    value={formData.operatingHours.end}
                                    onChange={(event) => setFormData(prev => ({
                                        ...prev,
                                        operatingHours: {
                                            ...prev.operatingHours,
                                            end: event.currentTarget.value,
                                        },
                                    }))}
                                />
                            </Group>
                            <MultiSelect
                                label="Features"
                                value={formData.features}
                                onChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    features: value,
                                }))}
                                data={[
                                    { value: 'lighting', label: 'Lighting' },
                                    { value: 'air-con', label: 'Air Conditioning' },
                                    { value: 'scoreboard', label: 'Scoreboard' },
                                    { value: 'shower', label: 'Shower Room' },
                                    { value: 'locker', label: 'Locker Room' },
                                ]}
                                searchable
                                clearable
                            />
                            <NumberInput
                                label="Maximum Players"
                                value={formData.maxPlayers}
                                onChange={(value) => setFormData(prev => ({
                                    ...prev,
                                    maxPlayers: value || 2,
                                }))}
                                min={2}
                                required
                            />
                            <Group position="right" mt="md">
                                <Button
                                    variant="light"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveCourt}
                                    disabled={!formData.name || !formData.type || !formData.surface}
                                >
                                    {editingCourtId ? 'Save Changes' : 'Add Court'}
                                </Button>
                            </Group>
                        </Stack>
                    </Modal>

                    <Paper p="md" radius="md" withBorder>
                        <Grid>
                            <Grid.Col span={{ base: 12, md: 3 }}>
                                <StatCard
                                    icon={<IconCut size={24} />}
                                    title="Total Courts"
                                    value={courts.length}
                                    color="blue"
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 3 }}>
                                <StatCard
                                    icon={<IconCheck size={24} />}
                                    title="Available"
                                    value={courts.filter(c => c.status === 'available').length}
                                    color="green"
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 3 }}>
                                <StatCard
                                    icon={<IconCalendarTime size={24} />}
                                    title="Reserved"
                                    value={courts.filter(c => c.status === 'reserved').length}
                                    color="orange"
                                />
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 3 }}>
                                <StatCard
                                    icon={<IconX size={24} />}
                                    title="Maintenance"
                                    value={courts.filter(c => c.status === 'maintenance').length}
                                    color="red"
                                />
                            </Grid.Col>
                        </Grid>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}
