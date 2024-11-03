"use client";
import { createTheme, MantineProvider } from "@mantine/core";

import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({
  fontFamily: "var(--font-sans)",
  radius: {
    sm: "0.6rem",
  },
});

export default function MainProvider({ children }: Props) {
  return (
    <SessionProvider>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
