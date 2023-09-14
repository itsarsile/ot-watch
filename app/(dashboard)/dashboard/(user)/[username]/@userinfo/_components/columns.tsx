"use client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { visitorReport } from "./table-schema";


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
      const createdDate = new Date(row.original.createdAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta"}).split(',')[0]
      return <div>{createdDate}</div>;
    },
  },
];







