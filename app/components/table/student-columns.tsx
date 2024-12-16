import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Student } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import { deleteStudent, updateStudent } from "~/store/students/studentSlice";
import { DeleteConfirmation } from "../delete-confirmation";
import { UniversalDialog } from "../dialog";
import { StudentForm } from "../forms/student-form";
import { Button } from "../ui/button";
import ImageUpload from "./image-upload-with-constraints";

export const studentColumns: ColumnDef<Student>[] = [
  {
    header: "First Name",
    accessorKey: "firstName",
  },
  {
    header: "Last Name",
    accessorKey: "lastName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    id: "actions",
    accessorKey: "Actions",
    cell: ({ row }) => {
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
            title="Edit Student"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <StudentForm
              student={row.original}
              onSubmit={(values) => {
                dispatch(
                  updateStudent({
                    id: row.original.id,
                    optionId: row.original.optionId,
                    ...values,
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
            title="Edit Student"
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DeleteConfirmation
              itemName={row.original.firstName + " " + row.original.lastName}
              itemType="Student"
              onCancel={() => setIsDeleteDialogOpen(false)}
              onConfirm={() => {
                dispatch(deleteStudent(row.original.id));
                setIsDeleteDialogOpen(false);
              }}
            />
          </UniversalDialog>
          <ImageUpload studentId={row.original.id} />
        </div>
      );
    },
  },
];
