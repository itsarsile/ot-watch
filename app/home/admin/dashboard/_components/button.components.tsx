"use client";
import { Card, Grid, Group, Paper, Stack, Title } from "@mantine/core";
import { IconListDetails, IconUsers } from "@tabler/icons-react";
import { MapDashboardModal, SFListModal, SFRegistrationModal } from "./modal.components";
import { useDisclosure } from "@mantine/hooks";

export const Actions = () => {
  return (
    <Stack>
      <Paper className="p-5 border">
        <Grid>
          <Grid.Col>
            <Group>
              <AccountCreationButton />
              <SalesForceListButton />
              <OpenTableListButton />
              <MapDashboardButton />
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};


const AccountCreationButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <SFRegistrationModal opened={opened} close={close} />
      <Card className="bg-blue-800" component="button" onClick={open}>
        <Card.Section className="p-3 text-white">
          <Group>
            <IconUsers />
            Registrasi Akun SF / SPV
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};

const SalesForceListButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <SFListModal opened={opened} close={close} />
      <Card className="bg-teal-800" component="button" onClick={open}>
        <Card.Section className="p-3 text-white">
          <Group>
            <IconListDetails />
            Daftar Sales Force
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};

const OpenTableListButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <SFListModal opened={opened} close={close} />
      <Card className="bg-orange-800" component="button" onClick={open}>
        <Card.Section className="p-3 text-white">
          <Group>
            <IconListDetails />
            Open Table List
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};

const MapDashboardButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <MapDashboardModal opened={opened} close={close} />
      <Card className="bg-orange-800" component="button" onClick={open}>
        <Card.Section className="p-3 text-white">
          <Group>
            <IconListDetails />
            Map Dashboard
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};