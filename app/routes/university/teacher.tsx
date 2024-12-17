import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import TeacherForm from "~/components/forms/teacher-form";
import { DataTable } from "~/components/table/data-table";
import { teacherColumns } from "~/components/table/teacher-columns";
import { Button } from "~/components/ui/button";
import Loader from "~/components/ui/loading-spinner";
import { DepartmentsState } from "~/store/departmentSlice";

import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { addTeacher, getTeachers, TeachersState } from "~/store/teacherSlice";

const TeacherPage = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { teachers, loading, error } = useAppSelector(
    (state: { teachers: TeachersState; departments: DepartmentsState }) =>
      state.teachers
  );

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <DataTable
      columns={teacherColumns}
      data={teachers}
      filterColumn="name"
      createElement={
        <UniversalDialog
          trigger={<Button>Create New Teacher</Button>}
          title="Create Teacher"
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <TeacherForm
            onSubmit={(values) => {
              dispatch(addTeacher(values));
              setIsEditDialogOpen(false);
            }}
          />
        </UniversalDialog>
      }
    />
  );
};

export default TeacherPage;
