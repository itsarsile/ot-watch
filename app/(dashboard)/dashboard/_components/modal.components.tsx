"use client";
import { fetcher } from "@/lib/fetcher";
import {
  ISFListModal,
  ISFRegistrationModal,
  IMapDashboard,
} from "@/types/interfaces";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  NativeSelect,
  PasswordInput,
  Stack,
  Table,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { mutate } from "swr";
export const SFRegistrationModal = ({
  opened,
  close,
  supervisors,
}: ISFRegistrationModal) => {
  console.log("🚀 ~ file: modal.components.tsx:41 ~ supervisors:", supervisors);
  const [loading, setLoading] = useState(false);

  const initialFormValues = {
    username: "",
    password: "",
    name: "",
    branch: "",
    agency: "",
    kcontact: "",
    type: "Sales Supervisor",
    supervisors: "",
    phoneNumber: "",
  };

  const form = useForm({
    initialValues: initialFormValues,
  });
  console.log(form.values.supervisors);
  const handleRegister = form.onSubmit(async (values, _event) => {
    try {
      setLoading(true);
      _event.preventDefault();
      const response = fetch("/api/auth/register/sales", {
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log(
        "🚀 ~ file: modal.components.tsx:28 ~ handleRegister ~ response:",
        response
      );
    } catch (error) {
      console.error(error);
    } finally {
      mutate("/api/users/supervisor");
      form.reset();
      setLoading(false);
      close();
    }
  });

  console.log(form.values);

  return (
    <Modal opened={opened} onClose={close} size="lg" title="Registrasi Akun SF">
      <form onSubmit={handleRegister}>
        <Stack>
          <TextInput
            label="Username"
            placeholder="Masukkan username SF..."
            {...form.getInputProps("username")}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Masukkan password SF..."
            {...form.getInputProps("password")}
            required
          />
          <NativeSelect
            label="Tipe Akun"
            data={["Sales Supervisor", "Sales Force"]}
            {...form.getInputProps("type")}
            required
          />
          {form.values.type === "Sales Force" && (
            <>
              <MultiSelect
                searchable
                maxSelectedValues={1}
                data={supervisors}
                label="Pilih Supervisor"
                required
                {...form.getInputProps("supervisors")}
              />
            </>
          )}
          <TextInput
            label="Nama"
            placeholder="Masukkan Nama SF..."
            {...form.getInputProps("name")}
            required
          />

          <TextInput
            label="K-Contact"
            placeholder="Masukkan K-Contact SF..."
            {...form.getInputProps("kcontact")}
            required
          />
          <Group grow>
            <TextInput
              label="Branch"
              placeholder="Masukkan branch SF..."
              {...form.getInputProps("branch")}
              required
            />
            <TextInput
              label="Agency"
              placeholder="Masukkan agency SF..."
              {...form.getInputProps("agency")}
              required
            />
          </Group>
          <TextInput
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon SF..."
            {...form.getInputProps("phoneNumber")}
            required
          />
          <Button
            type="submit"
            variant="default"
            loading={loading ? true : false}
          >
            Daftar
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export const SFListModal = ({ opened, close }: ISFListModal) => {
  return (
    <Modal
      size="83.33%"
      opened={opened}
      onClose={close}
      title="Daftar Sales Force"
    >
      <Table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>K-Contact</th>
            <th>Agency</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>
      </Table>
    </Modal>
  );
};
