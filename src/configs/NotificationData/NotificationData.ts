import { type NotificationData } from "@mantine/notifications";

export const SuccessNotificationData: NotificationData = {
  title: "Success",
  message: "Success",
  color: "teal",
};

export const ErrorNotificationData: NotificationData = {
  title: "Error",
  message: "Failed",
  color: "red",
};

export const LoadingNotificationData: NotificationData = {
  title: "Loading",
  message: "Updating venue...",
  color: "gray",
};

export const ConfirmDeleteNotificationData: NotificationData = {
  title: "Confirm Delete",
  message: "Are you sure you want to delete ?",
  color: "red",
};
