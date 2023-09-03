"use client";
import {
  AppShell,
  Burger,
  Code,
  Group,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  createStyles,
  rem,
} from "@mantine/core";
import { IconGauge, IconLogout, IconMapPin, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";
import { LinksGroup } from "./linksgroup.components";
import { signOut, useSession } from "next-auth/react";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export default function DashboardShell(props: { children: React.ReactNode }) {
  const { classes } = useStyles();
  const { data } = useSession();

  const AdminMenu = [
    {
      label: "Dashboard",
      icon: IconGauge,
      links: [
        { label: "Overview", link: `/dashboard/${data?.user?.username}` },
      ],
    },
    {
      label: "SF & SPV Management",
      icon: IconUsersGroup,
      links: [
        { label: "Semua Akun", link: `/dashboard/users` },
      ],
    },
    {
      label: "Lokasi Open Table",
      icon: IconMapPin,
      links: [
        { label: "Overview", link: `/dashboard/opentable`},
        { label: "Daftar Lokasi", link: `/dashboard/opentable/list`}
      ]
    }
  ];

  const UserMenu = [
    {
      label: "Dashboard", icon: IconGauge,
    },
  ]

  const AdminLinks = AdminMenu.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const UserLinks = UserMenu.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      header={
        <Header height={{ base: 70 }} p="md" className={classes.navbar}>
          <div className="flex justify-between items-center h-full">
            <Text>Dashboard</Text>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger onClick={() => setOpened((o) => !o)} opened={opened} />
            </MediaQuery>
          </div>
        </Header>
      }
      navbar={
        <Navbar
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}
        >
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
            </Group>
          </Navbar.Section>
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{data?.user.role === 'ADMIN' ? AdminLinks : UserLinks}</div>
          </Navbar.Section>
          <Navbar.Section className={classes.footer}>
            <div className={classes.linksInner}>
              <LinksGroup
                label="Logout"
                icon={IconLogout}
                onClick={() => signOut()}
              />
            </div>
          </Navbar.Section>
        </Navbar>
      }
      navbarOffsetBreakpoint="sm"
    >
      {props.children}
    </AppShell>
  );
}
