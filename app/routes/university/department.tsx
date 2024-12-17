import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import { DepartmentForm } from "~/components/forms/department-form";
import { DataTable } from "~/components/table/data-table";
import { departmentColumns } from "~/components/table/department-columns";
import { Button } from "~/components/ui/button";
import Loader from "~/components/ui/loading-spinner";

import {
  addDepartment,
  DepartmentsState,
  getDepartments,
} from "~/store/departmentSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

const Department = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { departments, loading, error } = useAppSelector(
    (state: { departments: DepartmentsState }) => state.departments
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  if (loading) {
    return <Loader />;
  }
  return (
    <DataTable
      columns={departmentColumns}
      data={departments}
      filterColumn="name"
      createElement={
        <UniversalDialog
          trigger={<Button>Create New Department</Button>}
          title="Create Department"
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <DepartmentForm
            onSubmit={(values) => {
              dispatch(addDepartment(values));
              setIsEditDialogOpen(false);
            }}
          />
        </UniversalDialog>
      }
    />
  );
};

export default Department;
