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
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ReportList() {
  const { data, isLoading, error } = useSWR("/api/visitor-reports", fetcher);

  if (error) {
    return <div>Error loading data</div>;
  }

  if (isLoading) {
    return <div>Loading data...</div>;
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Report List</CardTitle>
        <CardDescription>Daftar laporan pengujung terkini!</CardDescription>
      </CardHeader>
      <CardContent>
          <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
