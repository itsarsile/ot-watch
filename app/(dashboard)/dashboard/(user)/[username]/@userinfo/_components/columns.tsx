"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { visitorReport } from "./table-schema";
import { modals } from "@mantine/modals";
import {
  Group,
  Menu,
  Modal,
  Radio,
  Select,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";

export const columns: ColumnDef<visitorReport>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "visitorName",
    header: "Nama",
  },
  {
    accessorKey: "visitorPhone",
    header: "Nomor HP",
  },
  {
    accessorKey: "visitorDealing",
    header: "Jenis Prospek",
  },
  {
    accessorKey: "visitorAddress",
    header: "Alamat",
  },
  {
    accessorKey: "visitorNeeds",
    header: "Keperluan Pengunjung",
  },
  {
    accessorKey: "visitorTrackId",
    header: "Track ID",
  },
  {
    accessorKey: "createdAt",
    header: "Tgl. Laporan",
    cell: ({ row }) => {
      const createdDate = new Date(row.original.createdAt)
        .toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
        .split(",")[0];
      return <div>{createdDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;
      const handleDelete = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitor-reports`)
        } catch (error) {
          
        }
      }
    
      const [opened, { open, close }] = useDisclosure(false);
      return (
        <Menu width={rem(150)}>
          <VisitorReportUpdateModal data={data} opened={opened} close={close}/>
          <Menu.Target>
            <Button variant="ghost">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component="button" onClick={open}>
              Edit
            </Menu.Item>
            <Menu.Item>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
  },
];

export const VisitorReportUpdateModal = ({
  data,
  opened,
  close,
}: {
  data: any;
  opened: any;
  close: any;
}) => {
  const form = useForm({
    initialValues: {
      visitorName: data.visitorName,
      visitorPhone: data.visitorPhone,
      visitorNeeds: data.visitorNeeds,
      visitorDealing: data.visitorDealing,
      visitorTrackId: data?.visitorTrackId,
      visitorAddress: data.visitorAddress,
      visitorOtherNeeds: data.visitorNeeds,
    },
    validateInputOnBlur: true,
    validate: {
      visitorName: (value) =>
        value.length < 1 ? "Nama pengunjung wajib diisi" : null,
      visitorPhone: (value) =>
        value.length < 1 ? "Nomor pengunjung wajib diisi" : null,
      visitorAddress: (value) =>
        value.length < 1 ? "Alamat pengunjung wajib diisi" : null,
      visitorDealing: (value) =>
        value.length < 1 ? "Jenis dealing pengunjung wajib diisi" : null,
      visitorNeeds: (value) =>
        value.length < 1 ? "Kebutuhan pengunjung wajib diisi" : null,
      visitorOtherNeeds: (value) =>
        value.length < 1 ? "Kebutuhan pengunjung wajib diisi" : null,
      visitorTrackId: (value, values) => {
        if (values.visitorDealing === "dealing") {
          return value && value.length < 1
            ? "Track ID pengunjung wajib diisi"
            : null;
        }
        return null;
      },
    },
  });
  const handleSubmit = form.onSubmit(async (values, _event) => {
    _event.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/visitor-reports`, {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          reportId: data.id,
        }),
      });

      if (res.ok) {
        notifications.show({
          message: "Sukses mengupdate laporan!",
        });
      }
    } catch (error) {
      notifications.show({
        message: "Gagal mengupdate laporan",
      });
    }
  });

  return (
    <Modal opened={opened} onClose={close}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            required
            label="Nama Pengunjung"
            placeholder="Masukkan nama pengunjung..."
            {...form.getInputProps("visitorName")}
          />
          <TextInput
            required
            label="Nomor HP"
            placeholder="Masukkan nomor HP pengunjung..."
            {...form.getInputProps("visitorPhone")}
          />
          <TextInput
            required
            label="Alamat"
            placeholder="Masukkan alamat pengunjung..."
            {...form.getInputProps("visitorAddress")}
          />
          <Select
            required
            label="Keperluan Pengunjung"
            {...form.getInputProps("visitorNeeds")}
            placeholder="Pilih keperluan pengunjung..."
            data={[
              { value: "Daftar IndiHome", label: "Daftar IndiHome" },
              {
                value: "Tanya Seputar Produk",
                label: "Tanya Seputar Produk",
              },
              { value: "Keluhan Pelanggan", label: "Keluhan Pelanggan" },
              { value: "Pembelian Orbit", label: "Pembelian Orbit" },
              { value: "other", label: "Lainnya" },
            ]}
          />
          {form.values.visitorNeeds === "other" && (
            <TextInput
              required
              label="Keperluan Pengunjung Lainnya"
              placeholder="Isi keperluan lainnya..."
              {...form.getInputProps("visitorOtherNeeds")}
            />
          )}
          <Radio.Group
            required
            name="jenis-prospek"
            label="Jenis Prospek"
            {...form.getInputProps("visitorDealing")}
          >
            <Group>
              <Radio value="prospek" label="Prospek" />
              <Radio value="dealing" label="Dealing" />
            </Group>
          </Radio.Group>
          {form.values.visitorDealing === "dealing" && (
            <TextInput
              required
              label="Track ID Pelanggan"
              placeholder="Masukkan Track ID Pelanggan"
              {...form.getInputProps("visitorTrackId")}
            />
          )}

          <Button variant="outline" type="submit" className="mt-2">
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
