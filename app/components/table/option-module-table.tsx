import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UniversalDialog } from "~/components/dialog";

import { OptionModuleTeacher } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import {
  deleteOptionModuleTeacher,
  updateOptionModuleTeacher,
} from "~/store/moduleOptionSlice";
import OptionModuleTeacherForm from "../forms/option-module-form";

export const optionModuleTeacherColumns: ColumnDef<OptionModuleTeacher>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "option.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Option
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "module.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Module
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "teacher.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teacher
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const optionModuleTeacher = row.original;
      const dispatch = useAppDispatch();
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      return (
        <div className="space-x-2">
          <UniversalDialog
            trigger={
              <Button variant="ghost">
                <Pencil className="h-4 w-4" />
              </Button>
            }
            title="Edit Option Module Teacher"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <OptionModuleTeacherForm
              optionModuleTeacher={{
                id: optionModuleTeacher.id,
                optionId: optionModuleTeacher.option.id,
                moduleId: optionModuleTeacher.module.id,
                teacherId: optionModuleTeacher.teacher.id,
              }}
              onSubmit={(values) => {
                dispatch(
                  updateOptionModuleTeacher({
                    ...values,
                    id: optionModuleTeacher.id,
                  })
                );
                setIsEditDialogOpen(false);
              }}
            />
          </UniversalDialog>
          <Button
            variant="ghost"
            onClick={() => {
              dispatch(deleteOptionModuleTeacher(optionModuleTeacher.id));
            }}
          >
            <Trash2 className="h-4 w-4" color="red" />
          </Button>
        </div>
      );
    },
  },
];
