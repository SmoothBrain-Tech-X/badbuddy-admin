'use client';


import React, { useState } from 'react';
import {
    Container, Stack, Paper, Title, Text, Group, Grid, Card,
    Button, TextInput, Tabs, ThemeIcon, FileInput, Textarea,
    Switch, Select, MultiSelect, Avatar, Badge,
    Modal, List, ColorInput, ActionIcon, Menu, Divider,
    SimpleGrid, Image, Box
} from '@mantine/core';
import {
    IconBuildingCommunity, IconMapPin, IconPhone, IconMail,
    IconClock, IconSettings, IconPhotoPlus, IconTrash, IconEdit,
    IconBrandFacebook, IconBrandInstagram, IconBrandLine,
    IconWorld, IconBuildingStore, IconUserCircle, IconReceipt,
    IconBrandGoogle, IconAlertCircle, IconCheck, IconX,
    IconCreditCard, IconQrcode, IconBuildingBank, IconCash,
    IconUpload, IconDownload, IconLink
} from '@tabler/icons-react';

const ProfileManagement = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [editHoursModal, setEditHoursModal] = useState(false);
    const [editPaymentModal, setEditPaymentModal] = useState(false);
    const [deletePhotoModal, setDeletePhotoModal] = useState(false);

    // Mock venue data
    const venueData = {
        name: 'Sports Complex A',
        description: 'Professional badminton facility with 8 indoor courts',
        address: '123 Sports Complex, Bangkok 10110',
        phone: '+66812345678',
        email: 'contact@sportscomplex.com',
        website: 'www.sportscomplex.com',
        social: {
            facebook: 'fb.com/sportscomplex',
            instagram: '@sportscomplex',
            line: '@sportscomplex'
        },
        hours: {
            monday: { open: '07:00', close: '22:00' },
            tuesday: { open: '07:00', close: '22:00' },
            wednesday: { open: '07:00', close: '22:00' },
            thursday: { open: '07:00', close: '22:00' },
            friday: { open: '07:00', close: '22:00' },
            saturday: { open: '07:00', close: '22:00' },
            sunday: { open: '07:00', close: '22:00' }
        },
        facilities: ['Parking', 'Showers', 'Lockers', 'Pro Shop', 'Cafe'],
        paymentMethods: ['Credit Card', 'Bank Transfer', 'QR Payment', 'Cash']
    };

    const renderGeneralSettings = () => (
        <Stack>
            {/* Basic Information */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Basic Information</Title>
                    <Grid>
                        <Grid.Col span={6}>
                            <Stack>
                                <TextInput
                                    label="Venue Name"
                                    defaultValue={venueData.name}
                                    leftSection={<IconBuildingStore size={16} />}
                                />
                                <TextInput
                                    label="Email Address"
                                    defaultValue={venueData.email}
                                    leftSection={<IconMail size={16} />}
                                />
                                <TextInput
                                    label="Phone Number"
                                    defaultValue={venueData.phone}
                                    leftSection={<IconPhone size={16} />}
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Stack>
                                <TextInput
                                    label="Website"
                                    defaultValue={venueData.website}
                                    leftSection={<IconWorld size={16} />}
                                />
                                <Textarea
                                    label="Description"
                                    defaultValue={venueData.description}
                                    minRows={3}
                                />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Paper>

            {/* Location */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Location</Title>
                    <Grid>
                        <Grid.Col span={12}>
                            <Textarea
                                label="Address"
                                defaultValue={venueData.address}
                                leftSection={<IconMapPin size={16} />}
                            />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput label="City" defaultValue="Bangkok" />
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <TextInput label="Postal Code" defaultValue="10110" />
                        </Grid.Col>
                    </Grid>
                    <Button variant="light" leftSection={<IconMapPin size={16} />}>
                        Update Map Location
                    </Button>
                </Stack>
            </Paper>

            {/* Operating Hours */}
            <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Title order={4}>Operating Hours</Title>
                    <Button
                        variant="light"
                        leftSection={<IconClock size={16} />}
                        onClick={() => setEditHoursModal(true)}
                    >
                        Edit Hours
                    </Button>
                </Group>
                <Grid>
                    {Object.entries(venueData.hours).map(([day, hours]) => (
                        <Grid.Col span={6} key={day}>
                            <Group justify="space-between">
                                <Text transform="capitalize">{day}</Text>
                                <Text>{hours.open} - {hours.close}</Text>
                            </Group>
                        </Grid.Col>
                    ))}
                </Grid>
            </Paper>

            {/* Facilities & Amenities */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Facilities & Amenities</Title>
                    <MultiSelect
                        data={[
                            'Parking',
                            'Showers',
                            'Lockers',
                            'Pro Shop',
                            'Cafe',
                            'WiFi',
                            'Water Dispenser',
                            'First Aid',
                            'Rest Area'
                        ]}
                        defaultValue={venueData.facilities}
                        searchable
                        creatable
                    />
                </Stack>
            </Paper>

            {/* Social Media */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Social Media</Title>
                    <TextInput
                        label="Facebook"
                        defaultValue={venueData.social.facebook}
                        leftSection={<IconBrandFacebook size={16} />}
                    />
                    <TextInput
                        label="Instagram"
                        defaultValue={venueData.social.instagram}
                        leftSection={<IconBrandInstagram size={16} />}
                    />
                    <TextInput
                        label="Line Official"
                        defaultValue={venueData.social.line}
                        leftSection={<IconBrandLine size={16} />}
                    />
                </Stack>
            </Paper>
        </Stack>
    );

    const renderMediaSettings = () => (
        <Stack>
            {/* Venue Photos */}
            <Paper p="md" withBorder>
                <Stack>
                    <Group justify="space-between">
                        <Title order={4}>Venue Photos</Title>
                        <FileInput
                            placeholder="Upload photos"
                            accept="image/*"
                            leftSection={<IconPhotoPlus size={16} />}
                        />
                    </Group>
                    <SimpleGrid cols={4}>
                        {[1, 2, 3, 4].map((photo) => (
                            <Box key={photo} pos="relative">
                                <Image
                                    src="/api/placeholder/300/200"
                                    alt="Venue"
                                    radius="md"
                                />
                                <Group gap={5} pos="absolute" top={5} right={5}>
                                    <ActionIcon variant="filled" bg="white">
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        variant="filled"
                                        color="red"
                                        bg="white"
                                        onClick={() => setDeletePhotoModal(true)}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Paper>

            {/* Logo & Brand */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Logo & Brand</Title>
                    <Grid>
                        <Grid.Col span={6}>
                            <Stack>
                                <Text fw={500}>Venue Logo</Text>
                                <Group>
                                    <Avatar size="xl" radius="md" src="/api/placeholder/100/100" />
                                    <FileInput
                                        placeholder="Upload logo"
                                        accept="image/*"
                                        leftSection={<IconUpload size={16} />}
                                    />
                                </Group>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Stack>
                                <Text fw={500}>Brand Colors</Text>
                                <ColorInput label="Primary Color" defaultValue="#228be6" />
                                <ColorInput label="Secondary Color" defaultValue="#40c057" />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Paper>
        </Stack>
    );

    const renderBusinessSettings = () => (
        <Stack>
            {/* Payment Methods */}
            <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                    <Title order={4}>Payment Methods</Title>
                    <Button
                        variant="light"
                        leftSection={<IconSettings size={16} />}
                        onClick={() => setEditPaymentModal(true)}
                    >
                        Configure Payments
                    </Button>
                </Group>
                <SimpleGrid cols={2}>
                    {[
                        { icon: IconCreditCard, name: 'Credit/Debit Card', status: 'active' },
                        { icon: IconQrcode, name: 'QR Payment', status: 'active' },
                        { icon: IconBuildingBank, name: 'Bank Transfer', status: 'active' },
                        { icon: IconCash, name: 'Cash', status: 'active' }
                    ].map((method) => (
                        <Card key={method.name} withBorder>
                            <Group>
                                <ThemeIcon size="lg" variant="light">
                                    <method.icon size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text>{method.name}</Text>
                                    <Badge
                                        color={method.status === 'active' ? 'green' : 'gray'}
                                        variant="light"
                                    >
                                        {method.status}
                                    </Badge>
                                </div>
                            </Group>
                        </Card>
                    ))}
                </SimpleGrid>
            </Paper>

            {/* Business Documents */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Business Documents</Title>
                    <List spacing="md">
                        <List.Item
                            icon={
                                <ThemeIcon color="blue" variant="light">
                                    <IconReceipt size={16} />
                                </ThemeIcon>
                            }
                        >
                            <Group justify="space-between">
                                <div>
                                    <Text>Business Registration</Text>
                                    <Text size="sm" c="dimmed">PDF, uploaded 3 months ago</Text>
                                </div>
                                <Group>
                                    <Button variant="light" size="xs">View</Button>
                                    <Button variant="light" size="xs">Update</Button>
                                </Group>
                            </Group>
                        </List.Item>
                        <List.Item
                            icon={
                                <ThemeIcon color="blue" variant="light">
                                    <IconReceipt size={16} />
                                </ThemeIcon>
                            }
                        >
                            <Group justify="space-between">
                                <div>
                                    <Text>Tax Registration</Text>
                                    <Text size="sm" c="dimmed">PDF, uploaded 3 months ago</Text>
                                </div>
                                <Group>
                                    <Button variant="light" size="xs">View</Button>
                                    <Button variant="light" size="xs">Update</Button>
                                </Group>
                            </Group>
                        </List.Item>
                    </List>
                </Stack>
            </Paper>

            {/* Business Settings */}
            <Paper p="md" withBorder>
                <Stack>
                    <Title order={4}>Business Settings</Title>
                    <Grid>
                        <Grid.Col span={6}>
                            <Stack>
                                <Switch
                                    label="Auto-confirm Reservations"
                                    description="Automatically confirm Reservations when payment is received"
                                    defaultChecked
                                />
                                <Switch
                                    label="Allow cancellations"
                                    description="Let customers cancel Reservations up to 24 hours before"
                                    defaultChecked
                                />
                                <Switch
                                    label="Send booking reminders"
                                    description="Automatically send reminders to customers"
                                    defaultChecked
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Stack>
                                <Switch
                                    label="Show venue in search"
                                    description="Make venue visible in public searches"
                                    defaultChecked
                                />
                                <Switch
                                    label="Enable reviews"
                                    description="Allow customers to leave reviews"
                                    defaultChecked
                                />
                                <Switch
                                    label="Maintenance notifications"
                                    description="Send notifications during maintenance"
                                    defaultChecked
                                />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Paper>
        </Stack>
    );

    return (
        <Container fluid>
            <Stack>
                {/* Header */}
                <Paper p="md" withBorder>
                    <Group justify="space-between">
                        <Stack gap={0}>
                            <Title order={2}>Profile Management</Title>
                            <Text c="dimmed">Manage your venue profile and settings</Text>
                        </Stack>
                        <Button>Save Changes</Button>
                    </Group>
                </Paper>

                {/* Main Content */}
                <Tabs value={activeTab} onChange={setActiveTab}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="general"
                            leftSection={<IconBuildingStore size={16} />}
                        >
                            General
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="media"
                            leftSection={<IconPhotoPlus size={16} />}
                        >
                            Media
                        </Tabs.Tab>
                        <Tabs.Tab
                            value="business"
                            leftSection={<IconSettings size={16} />}
                        >
                            Business
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="general" pt="md">
                        {renderGeneralSettings()}
                    </Tabs.Panel>

                    <Tabs.Panel value="media" pt="md">
                        {renderMediaSettings()}
                    </Tabs.Panel>

                    <Tabs.Panel value="business" pt="md">
                        {renderBusinessSettings()}
                    </Tabs.Panel>
                </Tabs>
            </Stack>

            {/* Operating Hours Modal */}
            <Modal
                opened={editHoursModal}
                onClose={() => setEditHoursModal(false)}
                title="Edit Operating Hours"
                size="lg"
            >
                <Stack>
                    {Object.entries(venueData.hours).map(([day, hours]) => (
                        <Grid key={day}>
                            <Grid.Col span={4}>
                                <Text transform="capitalize">{day}</Text>
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput defaultValue={hours.open} label="Open" />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <TextInput defaultValue={hours.close} label="Close" />
                            </Grid.Col>
                        </Grid>
                    ))}
                    <Divider my="md" />
                    <Stack>
                        <Switch label="Apply same hours to all days" />
                        <Switch label="Mark as 24/7 operation" />
                    </Stack>
                    <Group justify="flex-end" mt="md">
                        <Button variant="light" onClick={() => setEditHoursModal(false)}>
                            Cancel
                        </Button>
                        <Button>Save Hours</Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Payment Settings Modal */}
            <Modal
                opened={editPaymentModal}
                onClose={() => setEditPaymentModal(false)}
                title="Payment Settings"
                size="lg"
            >
                <Stack>
                    {/* Credit Card Settings */}
                    <Paper withBorder p="md">
                        <Stack>
                            <Group>
                                <ThemeIcon size="lg" variant="light">
                                    <IconCreditCard size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text fw={500}>Credit Card Payments</Text>
                                    <Text size="sm" c="dimmed">Accept credit and debit cards</Text>
                                </div>
                                <Switch defaultChecked ml="auto" />
                            </Group>
                            <Grid>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Merchant ID"
                                        placeholder="Enter merchant ID"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Select
                                        label="Payment Gateway"
                                        data={[
                                            { value: 'stripe', label: 'Stripe' },
                                            { value: 'omise', label: 'Omise' },
                                        ]}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>

                    {/* QR Payment Settings */}
                    <Paper withBorder p="md">
                        <Stack>
                            <Group>
                                <ThemeIcon size="lg" variant="light">
                                    <IconQrcode size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text fw={500}>QR Payment</Text>
                                    <Text size="sm" c="dimmed">PromptPay and other QR payments</Text>
                                </div>
                                <Switch defaultChecked ml="auto" />
                            </Group>
                            <TextInput
                                label="PromptPay ID"
                                placeholder="Enter PromptPay ID/Phone number"
                            />
                        </Stack>
                    </Paper>

                    {/* Bank Transfer Settings */}
                    <Paper withBorder p="md">
                        <Stack>
                            <Group>
                                <ThemeIcon size="lg" variant="light">
                                    <IconBuildingBank size={20} />
                                </ThemeIcon>
                                <div>
                                    <Text fw={500}>Bank Transfer</Text>
                                    <Text size="sm" c="dimmed">Direct bank transfer details</Text>
                                </div>
                                <Switch defaultChecked ml="auto" />
                            </Group>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Select
                                        label="Bank"
                                        data={[
                                            { value: 'scb', label: 'SCB' },
                                            { value: 'kbank', label: 'Kasikorn Bank' },
                                            { value: 'bbl', label: 'Bangkok Bank' },
                                        ]}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TextInput
                                        label="Account Number"
                                        placeholder="Enter account number"
                                    />
                                </Grid.Col>
                                <Grid.Col span={12}>
                                    <TextInput
                                        label="Account Name"
                                        placeholder="Enter account name"
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>

                    {/* Payment Policies */}
                    <Paper withBorder p="md">
                        <Stack>
                            <Text fw={500}>Payment Policies</Text>
                            <Grid>
                                <Grid.Col span={6}>
                                    <Select
                                        label="Payment Due"
                                        data={[
                                            { value: 'immediate', label: 'Immediate Payment Required' },
                                            { value: '1hour', label: 'Within 1 Hour' },
                                            { value: '3hour', label: 'Within 3 Hours' },
                                            { value: '24hour', label: 'Within 24 Hours' },
                                        ]}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Select
                                        label="Refund Policy"
                                        data={[
                                            { value: '24hour', label: '24 Hours Before' },
                                            { value: '48hour', label: '48 Hours Before' },
                                            { value: '72hour', label: '72 Hours Before' },
                                            { value: 'none', label: 'No Refunds' },
                                        ]}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>

                    <Group justify="flex-end" mt="md">
                        <Button variant="light" onClick={() => setEditPaymentModal(false)}>
                            Cancel
                        </Button>
                        <Button>Save Payment Settings</Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Delete Photo Modal */}
            <Modal
                opened={deletePhotoModal}
                onClose={() => setDeletePhotoModal(false)}
                title={
                    <Group gap="xs">
                        <ThemeIcon color="red" variant="light">
                            <IconAlertCircle size={16} />
                        </ThemeIcon>
                        <Text fw={500}>Delete Photo</Text>
                    </Group>
                }
            >
                <Stack>
                    <Text size="sm">Are you sure you want to delete this photo?</Text>
                    <Text size="sm" c="dimmed">This action cannot be undone.</Text>
                    <Group justify="flex-end" mt="md">
                        <Button variant="light" onClick={() => setDeletePhotoModal(false)}>
                            Cancel
                        </Button>
                        <Button color="red">Delete Photo</Button>
                    </Group>
                </Stack>
            </Modal>

            {/* Additional settings section for notifications */}
            <Paper p="md" withBorder mt="xl">
                <Stack>
                    <Title order={4}>Notification Settings</Title>
                    <Grid>
                        <Grid.Col span={6}>
                            <Stack>
                                <Switch
                                    label="Email Notifications"
                                    description="Receive booking notifications via email"
                                    defaultChecked
                                />
                                <Switch
                                    label="SMS Notifications"
                                    description="Receive booking notifications via SMS"
                                    defaultChecked
                                />
                                <Switch
                                    label="Line Notifications"
                                    description="Receive notifications via Line"
                                    defaultChecked
                                />
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <Stack>
                                <Switch
                                    label="Booking Confirmations"
                                    description="Send automatic booking confirmations"
                                    defaultChecked
                                />
                                <Switch
                                    label="Cancellation Notifications"
                                    description="Get notified of booking cancellations"
                                    defaultChecked
                                />
                                <Switch
                                    label="Review Notifications"
                                    description="Get notified of new reviews"
                                    defaultChecked
                                />
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Paper>
        </Container>
    );
};

export default ProfileManagement;