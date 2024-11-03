"use client";

import React, { useEffect } from "react";
import {
  Container,
  Stack,
  Paper,
  Title,
  Text,
  Group,
  Grid,
  Button,
  Tabs,
} from "@mantine/core";
import { IconBuildingStore } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileSchemaType,
} from "@/schemas/profile/profile.schema";
import ControlledInputText from "@/app/_components/Controlled/ControlledInputText";
import ControlledInputTextarea from "@/app/_components/Controlled/ControlledInputTextarea";
import useGetProfile from "@/hooks/profile/useGetProfile";
import useUpdateProfile from "@/hooks/profile/useUpdateProfile";
import { notifications } from "@mantine/notifications";
import {
  ErrorNotificationData,
  LoadingNotificationData,
  SuccessNotificationData,
} from "@/configs/NotificationData/NotificationData";
import BackButton from "@/app/_components/BackButton/BackButton";

const ProfileManagement = () => {
  const getProfile = useGetProfile();
  const updateProfile = useUpdateProfile();

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (getProfile.data) {
      setValue("first_name", getProfile.data.first_name);
      setValue("last_name", getProfile.data.last_name);
      setValue("bio", getProfile.data.bio);
      setValue("phone", getProfile.data.phone);
      setValue("location", getProfile.data.location);
      setValue("play_level", getProfile.data.play_level);
      setValue("avatar_url", getProfile.data.avatar_url);
    }
  }, [getProfile.data, setValue]);

  const onEdit = (data: ProfileSchemaType) => {
    const keyNoti = notifications.show(LoadingNotificationData);
    updateProfile.mutate(data, {
      onSuccess: () => {
        notifications.update({
          id: keyNoti,
          ...SuccessNotificationData,
          message: "Profile updated successfully",
        });
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifications.update({
            id: keyNoti,
            ...ErrorNotificationData,
            message: error.message,
          });
        }
      },
    });
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
                <ControlledInputText
                  control={control}
                  name="first_name"
                  props={{
                    label: "First Name",
                    placeholder: "Enter your first name",
                  }}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack>
                <ControlledInputText
                  control={control}
                  name="last_name"
                  props={{
                    label: "Last Name",
                    placeholder: "Enter your last name",
                  }}
                />
              </Stack>
            </Grid.Col>
          </Grid>
          <ControlledInputTextarea
            control={control}
            name="bio"
            props={{
              label: "Bio",
              placeholder: "Tell us about yourself",
            }}
          />
          <Grid>
            <Grid.Col span={6}>
              <ControlledInputText
                control={control}
                name="phone"
                props={{
                  label: "Phone",
                  placeholder: "Enter your phone number",
                }}
              />
              <ControlledInputText
                control={control}
                name="location"
                props={{
                  label: "Location",
                  placeholder: "Enter your location",
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ControlledInputText
                control={control}
                name="play_level"
                props={{
                  label: "Play Level",
                  placeholder: "Enter your play level",
                }}
              />
              <ControlledInputText
                control={control}
                name="avatar_url"
                props={{
                  label: "Avatar URL",
                  placeholder: "Enter your avatar URL",
                }}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );

  return (
    <Container fluid>
      <BackButton />
      <Stack>
        {/* Header */}
        <Paper p="md" withBorder>
          <Group justify="space-between">
            <Stack gap={0}>
              <Title order={2}>Profile Management</Title>
              <Text c="dimmed">Manage your venue profile and settings</Text>
            </Stack>
            <Button
              onClick={() => {
                void handleSubmit(onEdit)();
              }}
            >
              Save Changes
            </Button>
          </Group>
        </Paper>

        {/* Main Content */}
        <Tabs defaultValue="general">
          <Tabs.List>
            <Tabs.Tab
              value="general"
              leftSection={<IconBuildingStore size={16} />}
            >
              General
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="general" pt="md">
            {renderGeneralSettings()}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default ProfileManagement;
