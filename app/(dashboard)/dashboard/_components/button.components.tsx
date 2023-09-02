"use client";
import { Card, Grid, Group, Paper, Stack, Title } from "@mantine/core";
import { IconListDetails, IconUsers } from "@tabler/icons-react";
import { SFListModal, SFRegistrationModal } from "./modal.components";
import { useDisclosure } from "@mantine/hooks";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import axios from "axios";

type Supervisor = {
  name: string;
  kcontact: string;
};

export const UsersActions = () => {
  const { data: supervisorsData, isLoading } = useSWR(
    "/api/users/supervisor",
    fetcher
  );
  if (isLoading) return <div>Loading data...</div>;
  console.log(
    "🚀 ~ file: button.components.tsx:30 ~ AccountCreationButton ~ data:",
    supervisorsData
  );
  const supervisors = supervisorsData?.supervisors.map(
    (supervisor: Supervisor) => `${supervisor.name} - ${supervisor.kcontact}`
  );
  return (
    <Stack>
      <Paper className="p-5">
        <Grid>
          <Grid.Col>
            <Group>
              <SWRConfig
                value={{
                  refreshInterval: 3000,
                }}
              >
                <AccountCreationButton supervisors={supervisors} />
              </SWRConfig>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};

const AccountCreationButton = ({ supervisors }: { supervisors: [] }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <SFRegistrationModal
        opened={opened}
        close={close}
        supervisors={supervisors}
      />
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
