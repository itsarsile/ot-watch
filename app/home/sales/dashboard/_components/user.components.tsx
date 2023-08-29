"use client";
import {
  Avatar,
  Button,
  Card,
  Group,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import React from "react";

interface IUserCards {
  name: string;
}

export function UserCard({ name }: IUserCards) {
  return (
    <Card className="p-10" withBorder>
      <Card.Section>
        <Group>
          <Avatar className="w-28 h-28" radius="xl" />
          <Stack>
            <Title order={3}>Selamat datang, {name}!</Title>
            <Button className="w-28 bg-green-500">Absen</Button>
          </Stack>
        </Group>
      </Card.Section>
    </Card>
  );
}
