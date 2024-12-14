"use client";

import { useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import { AttendanceForm } from "~/components/forms/attendance-form";
import { attendanceColumns } from "~/components/table/attendance-columns";
import { DataTable } from "~/components/table/data-table";
import { Button } from "~/components/ui/button";
import { Attendance, Student, testStudents } from "~/lib/types";

const AttendanceComponent = () => {
  const [students, setStudents] = useState(testStudents);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleCreateAttendance = (values: Partial<Attendance>) => {
    if (selectedStudent) {
      const updatedStudents = students.map((student) => {
        if (student.id === selectedStudent.id) {
          return {
            ...student,
            attendances: [
              ...student.attendances,
              {
                id: Math.max(0, ...student.attendances.map((a) => a.id)) + 1,
                ...values,
                studentId: student.id,
              } as Attendance,
            ],
          };
        }
        return student;
      });
      setStudents(updatedStudents);
      setIsCreateDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Student Attendance</h1>
      <DataTable
        columns={attendanceColumns}
        data={students}
        filterColumn="lastName"
        createElement={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Create New Attendance
          </Button>
        }
      />
      <UniversalDialog
        trigger={<></>}
        title="Create Attendance"
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        {selectedStudent ? (
          <AttendanceForm
            student={selectedStudent}
            onSubmit={handleCreateAttendance}
          />
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select a Student</h2>
            {students.map((student) => (
              <Button
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="mr-2 mb-2"
              >
                {student.firstName} {student.lastName}
              </Button>
            ))}
          </div>
        )}
      </UniversalDialog>
    </div>
  );
};

export default AttendanceComponent;
