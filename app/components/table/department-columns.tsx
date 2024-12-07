import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Department } from "~/lib/types";
import { deleteDepartment, updateDepartment } from "~/store/departmentSlice";
import { useAppDispatch } from "~/store/hooks";
import { DeleteConfirmation } from "../delete-confirmation";
import { UniversalDialog } from "../dialog";
import { DepartmentForm } from "../forms/department-form";

export const departmentColumns: ColumnDef<Department>[] = [
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
      const department = row.original;
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
            title="Edit Department"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <DepartmentForm
              department={department}
              onSubmit={(values) => {
                dispatch(updateDepartment({ id: row.original.id, ...values }));
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
                <Trash2 className="h-4 w-4" color="red" />
              </Button>
            }
            title="Edit Department"
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DeleteConfirmation
              itemName={row.original.name}
              itemType="Department"
              onCancel={() => setIsDeleteDialogOpen(false)}
              onConfirm={() => {
                dispatch(deleteDepartment(row.original.id));
                setIsDeleteDialogOpen(false);
              }}
            />
          </UniversalDialog>
        </div>
      );
    },
  },
];
