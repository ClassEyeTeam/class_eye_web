"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { useState } from "react";
import { Attendance, AttendanceStatus } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import { updateAttendance } from "~/store/students/attendanceSlice";
import { UniversalDialog } from "../dialog";
import { AttendanceForm, AttendanceFormValues } from "../forms/attendance-form";
interface AttendanceColumn {
  data: Attendance[];
  sessionId: number;
}
export const attendanceColumns = ({
  sessionId,
  data,
}: AttendanceColumn): ColumnDef<Attendance>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.student.firstName;
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => {
      return row.original.student.lastName;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.student.email;
    },
  },
  {
    id: "status",
    header: "Attendance Status",
    cell: ({ row }) => {
      return row.original.status;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const attendance = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const dispatch = useAppDispatch();
      const handleAttendanceSubmit = (
        values: AttendanceFormValues,
        attendance: Attendance
      ) => {
        dispatch(
          updateAttendance({
            id: attendance.id,
            attendance: {
              startTime:
                attendance.status == AttendanceStatus.NOT_RECORDED
                  ? new Date().toISOString()
                  : attendance.startTime,
              id: attendance.id,
              sessionId: sessionId,
              ...values,
            },
          })
        );

        setIsDialogOpen(false);
      };

      return (
        <div className="space-x-2">
          <UniversalDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDialogOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            }
            title={"Update Attendance"}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <AttendanceForm
              attendance={attendance}
              onSubmit={(values) => handleAttendanceSubmit(values, attendance)}
            />
          </UniversalDialog>
        </div>
      );
    },
  },
];
