"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Group, Radio, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

function VisitorReports({ userId }: { userId: number }) {
  const router = useRouter()
  const form = useForm({
    initialValues: {
      visitorName: "",
      visitorPhone: "",
      visitorNeeds: "",
      visitorDealing: "",
      visitorTrackId: "",
      visitorAddress: "",
      visitorOtherNeeds: "",
    },
  });

  

  const handleSubmit = form.onSubmit(async (values, _event) => {
    _event.preventDefault();
    try {
      const finalVisitorNeeds = 
    values.visitorNeeds === "other"
      ? values.visitorOtherNeeds
      : values.visitorNeeds

      const response = await fetch("/api/visitor-reports", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          userId: userId,
          visitorNeeds: finalVisitorNeeds
        }),
      });

      if (response.ok) {
        notifications.show({
          message: "Kunjungan pelanggan terlaporkan!",
          color: "green",
        });
        mutate('/api/visitor-reports')
        router.refresh()

      }
      form.reset();
    } catch (error) {
      notifications.show({
        message: "Error terjadi!",
      });
      form.reset();
    }
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Laporan Pengunjung</CardTitle>
        <CardDescription>Isi laporan pengunjung disini!</CardDescription>
      </CardHeader>
      <CardContent>
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

            <Button variant="default" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

export default VisitorReports;
