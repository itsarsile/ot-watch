"use client";

import {
  Avatar,
  Divider,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface INavigationProps {
  name?: string;
  avatar?: string;
  role?: string;
  username?: string;
}

export const NavigationBar = ({
  name,
  avatar,
  role,
  username,
}: INavigationProps) => {
  const [opened, { toggle }] = useDisclosure();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <>
      <Group position="apart">
        <Title order={3}>
          <Link href="/">OpenTable Watch</Link>
        </Title>
        <Menu
          width={200}
          withinPortal
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withArrow
        >
          <Menu.Target>
            <UnstyledButton className="hover:bg-slate-400/20 px-2 rounded-md">
              <Group>
                <Text>{name}</Text>
                <Avatar src={avatar} radius="xl" />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            {
              role === 'ADMIN' ? (
                <Link href={`/home/admin/dashboard/${username}`}>
                  <Menu.Item>Dashboard</Menu.Item>
                </Link>
              ) : (
                <Link href={`/home/sales/dashboard/${username}`}>
                  <Menu.Item>Dashboard</Menu.Item>
                </Link>
              )
            }
            <Menu.Item component="button" onClick={() => signOut()}>
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Divider className="my-5" />
    </>
  );
};
