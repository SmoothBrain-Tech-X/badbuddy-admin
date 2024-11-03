"use client";

import { AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavbarMenu from "../_components/NavbarMenu/NavbarMenu";
import AccountNavbarMenu from "../_components/NavbarMenu/AccountNavbarMenu";

interface Props {
  children: React.ReactNode;
}

export default function LayoutProvider(props: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 230,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <span className="text-xl font-bold text-blue-600">Venue Manager</span>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavbarMenu />
        </AppShell.Section>
        <AppShell.Section>
          <AccountNavbarMenu />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}
