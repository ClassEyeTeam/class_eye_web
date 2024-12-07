import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Option } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import { deleteOption, updateOption } from "~/store/optionSlice";
import { DeleteConfirmation } from "../delete-confirmation";
import { UniversalDialog } from "../dialog";
import OptionForm from "../forms/option-form";

export const optionColumns: ColumnDef<Option>[] = [
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
    accessorKey: "departmentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Department
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.department.name}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const option = row.original;
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
            title="Edit Option"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <OptionForm
              option={{
                ...option,
                departmentId: option.department.id,
              }}
              // Pass the departments prop here
              onSubmit={(values) => {
                dispatch(
                  updateOption({
                    ...values,
                    id: row.original.id,
                    departmentId: values.departmentId, // TODO :to demonstrate the change in cicd pipeline
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
                <Trash2 className="h-4 w-4" color="red" />
              </Button>
            }
            title="Edit Department"
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DeleteConfirmation
              itemName={row.original.name}
              itemType="Option"
              onCancel={() => setIsDeleteDialogOpen(false)}
              onConfirm={() => {
                dispatch(deleteOption(row.original.id));
                setIsDeleteDialogOpen(false);
              }}
            />
          </UniversalDialog>
        </div>
      );
    },
  },
];
