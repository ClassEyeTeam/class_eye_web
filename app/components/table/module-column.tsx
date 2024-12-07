"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import ModuleForm from "~/components/forms/module-form";
import { Module } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import { deleteModule, updateModule } from "~/store/moduleSlice";

export const moduleColumns: ColumnDef<Module>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const module = row.original;
      const dispatch = useAppDispatch();
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      return (
        <div className="space-x-2">
          <UniversalDialog
            trigger={
              <Button variant="ghost">
                <Pencil className="h-4 w-4" color="blue" />
              </Button>
            }
            title="Edit Module"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <ModuleForm
              module={module}
              onSubmit={(values) => {
                dispatch(updateModule({ id: module.id, ...values }));
                setIsEditDialogOpen(false);
              }}
            />
          </UniversalDialog>
          <Button
            variant="ghost"
            onClick={() => {
              dispatch(deleteModule(module.id));
              setIsDeleteDialogOpen(false);
            }}
          >
            <Trash2 className="h-4 w-4" color="red" />
          </Button>
        </div>
      );
    },
  },
];
