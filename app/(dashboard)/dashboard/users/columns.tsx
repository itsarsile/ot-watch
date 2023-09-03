"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { modals } from '@mantine/modals'
import { EditUserModal } from "../_components/modal.components";
import { useDisclosure } from "@mantine/hooks";

export type Users = {
  userId: number;
  name: string;
  branch: string;
  status?: string;
  kcontact: string;
  phoneNumber: string;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "kcontact",
    header: ({ column }) => {
      return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          K-Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Nomor Telp",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [opened, { open, close }] = useDisclosure(false);
      return (
        <DropdownMenu>
          <EditUserModal opened={opened} close={close} userData={user}/>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.kcontact)}
            >
              Copy K-Contact
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={open}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
