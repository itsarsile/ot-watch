"use client";
import {
  ISFListModal,
  ISFRegistrationModal,
  IMapDashboard,
} from "@/types/interfaces";
import {
  Button,
  Modal,
  MultiSelect,
  NativeSelect,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import MapPages from "../[username]/@maps/pages";

export const SFRegistrationModal = ({
  opened,
  close,
}: ISFRegistrationModal) => {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      name: "",
      kcontact: "",
      type: "",
      phoneNumber: "",
    },
  });

  console.log(form.values);

  const handleRegister = form.onSubmit(async (values, _event) => {
    try {
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
      close();
    }
  });
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Registrasi Akun SF"
      transitionProps={{ transition: "slide-up", duration: 500 }}
    >
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
                data={["Hadyan Arif - SPAFK02", "Hari Dirgantara - SPAFK05"]}
                label="Pilih Supervisor"
                required
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
          <TextInput
            label="Nomor Telepon"
            placeholder="Masukkan nomor telepon SF..."
            {...form.getInputProps("phoneNumber")}
            required
          />
          <Button type="submit" variant="default">
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
      Hello
    </Modal>
  );
};

export const MapDashboardModal = ({ opened, close }: IMapDashboard) => {
  return (
    <Modal fullScreen opened={opened} onClose={close} title="Map">
      <MapPages />
    </Modal>
  )
};
