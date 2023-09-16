"use client";
import { DataTable } from "./_components/data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { columns } from "./_components/columns";
import React, { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { Loader, rem } from "@mantine/core";

export default function ReportList() {
  // const currentDate = new Date()
  const [dateQuery, setDateQuery] = useState<Date | null>(null);
  const { data, isLoading, isValidating, error } = useSWR(
    dateQuery
      ? `/api/visitor-reports?date=${dateQuery}`
      : `/api/visitor-reports?`,
    fetcher
  );

  if (error) {
    console.log("🚀 ~ file: ReportList.tsx:28 ~ ReportList ~ error:", error)
    return <div>Error loading data</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report List</CardTitle>
        <CardDescription>Daftar laporan pengujung terkini!</CardDescription>
      </CardHeader>
      <CardContent>
        <DatePickerInput
        maw={rem(250)}
          label="Pilih Tanggal"
          value={dateQuery}
          clearable
          onChange={setDateQuery}
          placeholder="Lihat data berdasarkan tanggal..."
          className="mb-5"
        />
        {isLoading ? (
          <Loader className="mx-auto" />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </CardContent>
    </Card>
  );
}
