"use client";
import { fetcher } from "@/lib/fetcher";
import { Card, Grid, Group, Paper, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUsers } from "@tabler/icons-react";
import useSWR, { SWRConfig } from "swr";
import { SFRegistrationModal } from "./modal.components";

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
      <Card component="button" onClick={open} withBorder>
        <Card.Section className="p-3">
          <Group>
            <IconUsers />
            Registrasi Akun SF / SPV
          </Group>
        </Card.Section>
      </Card>
    </>
  );
};
