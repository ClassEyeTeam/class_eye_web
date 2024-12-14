"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { useState } from "react";
import { Attendance, Student } from "~/lib/types";
import { UniversalDialog } from "../dialog";
import { AttendanceForm } from "../forms/attendance-form";

export const attendanceColumns: ColumnDef<Student>[] = [
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
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "attendanceStatus",
    header: "Attendance Status",
    cell: ({ row }) => {
      const student = row.original;
      const latestAttendance =
        student.attendances[student.attendances.length - 1];
      return latestAttendance ? latestAttendance.status : "Not Recorded";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const student = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const latestAttendance =
        student.attendances[student.attendances.length - 1];

      const handleAttendanceUpdate = (values: Partial<Attendance>) => {
        const updatedStudents = table.options.data.map((s: Student) => {
          if (s.id === student.id) {
            return {
              ...s,
              attendances: [
                ...s.attendances.slice(0, -1),
                { ...latestAttendance, ...values } as Attendance,
              ],
            };
          }
          return s;
        });
        // table.options.meta?.updateData(updatedStudents);
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
            title={latestAttendance ? "Update Attendance" : "Create Attendance"}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <AttendanceForm
              student={student}
              attendance={latestAttendance}
              onSubmit={handleAttendanceUpdate}
            />
          </UniversalDialog>
        </div>
      );
    },
  },
];
