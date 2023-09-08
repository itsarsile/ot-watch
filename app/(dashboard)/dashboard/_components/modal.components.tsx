"use client";
import { fetcher } from "@/lib/fetcher";
import {
  ISFListModal,
  ISFRegistrationModal,
  IMapDashboard,
  Disclosure,
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
import { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import useSWR, { mutate } from "swr";
export const SFRegistrationModal = ({
  opened,
  close,
  supervisors,
}: ISFRegistrationModal) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
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
  
  const handleRegister = form.onSubmit(async (values, _event) => {
    _event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register/sales", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (response.ok) {
        mutate('/api/users')
        router.refresh()
      }
    } catch (error) {
      console.error(error);
    } finally {
      mutate("/api/users/supervisor");
      form.reset();
      setLoading(false);
      close();
    }
  });


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

interface IEditUser extends Disclosure {
  userData: any;
}

export const EditUserModal = ({ opened, close, userData }: IEditUser) => {
  const form = useForm({
    initialValues: {
      name: userData?.name,
      branch: userData?.branch,
      agency: userData?.agency,
      phoneNumber: userData?.phoneNumber,
      kcontact: userData?.kcontact,
    }
  });


 
  return (
    <Modal size="md" opened={opened} onClose={close} title="Edit User">
      <Stack>
        <TextInput label="Nama" {...form.getInputProps("name")} />
        <TextInput label="Branch" {...form.getInputProps("branch")} />
        <TextInput label="Agency" {...form.getInputProps("agency")} />
        <TextInput label="K-Contact" {...form.getInputProps("kcontact")} />
        <TextInput label="Nomor Telp." {...form.getInputProps("phoneNumber")} />
        <Button variant="default" className="bg-slate-600">Update User</Button>
      </Stack>
    </Modal>
  );
};
