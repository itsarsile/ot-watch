"use client";
import { Button, Modal, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface ISFRegistrationModal {
  opened: boolean;
  close: () => void;
}

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
      phoneNumber: "",
    },
  });

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
        console.error(error)
    } finally {
        close()
    }
  });
  return (
    <Modal opened={opened} onClose={close} title="Registrasi Akun SF">
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
        <Button type="submit" variant="default">Daftar</Button>
        </Stack>

      </form>
    </Modal>
  );
};
