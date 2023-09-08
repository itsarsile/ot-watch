"use client"
import { ColumnDef } from "@tanstack/react-table"
import { visitorReport } from "./table-schema"

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
        header: "Nomor Telp."
    },
    {
        accessorKey: "visitorDealing",
        header: "Jenis Dealing",
    },
    {
        accessorKey: "visitorNeeds",
        header: "Keperluan",
    },
    {
        accessorKey: "visitorTrackId",
        header: "Track ID"
    }
]