"use client";
import { Card, Group } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { SFRegistrationModal } from "./modal.components";
import { useDisclosure } from "@mantine/hooks";

export const AccountCreation = () => {
    const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
    <SFRegistrationModal opened={opened} close={close}/>
      <Card className="bg-blue-800" component="button" onClick={open}>
        <Card.Section className="p-4 text-white">
          <Group>
            <IconUsers />
            Registrasi Akun SF
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};
