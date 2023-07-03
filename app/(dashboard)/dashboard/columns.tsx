"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { UrlData } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<UrlData>[] = [
  {
    accessorKey: "display_id",
    header: "ID",
    cell: ({ row }) => {
      return <Link href={row.original.url}>{row.original.display_id}</Link>
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "requests",
    header: "Requests",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => redirect("/dashboard/admin/user/" + user.id)}
            >
              View user
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Manage roles</DropdownMenuItem>
            <DropdownMenuItem>Remove User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
