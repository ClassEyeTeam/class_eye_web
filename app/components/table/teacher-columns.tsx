"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Teacher } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import { deleteTeacher, updateTeacher } from "~/store/teacherSlice";
import { DeleteConfirmation } from "../delete-confirmation";
import { UniversalDialog } from "../dialog";
import TeacherForm from "../forms/teacher-form";

export const teacherColumns: ColumnDef<Teacher>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "departmentId",
    header: "Department",
    cell: ({ row }) => {
      return <span>{row.original.department.name}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const teacher = row.original;
      const dispatch = useAppDispatch();
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      return (
        <div className=" space-x-2">
          <UniversalDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            }
            title="Edit Teacher"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <TeacherForm
              teacher={{
                ...teacher,
                departmentId: teacher.department.id.toString(),
              }}
              onSubmit={(values) => {
                dispatch(
                  updateTeacher({
                    ...values,
                    id: row.original.id,
                    departmentId: row.original.department.id,
                  })
                );
                setIsEditDialogOpen(false);
              }}
            />
          </UniversalDialog>

          <UniversalDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Edit Department"
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DeleteConfirmation
              itemName={row.original.name}
              itemType="Teacher"
              onCancel={() => setIsDeleteDialogOpen(false)}
              onConfirm={() => {
                dispatch(deleteTeacher(row.original.id));
                setIsDeleteDialogOpen(false);
              }}
            />
          </UniversalDialog>
        </div>
      );
    },
  },
];
