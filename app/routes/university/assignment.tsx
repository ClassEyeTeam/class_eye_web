import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import OptionModuleTeacherForm from "~/components/forms/option-module-form";
import { DataTable } from "~/components/table/data-table";
import { optionModuleTeacherColumns } from "~/components/table/option-module-table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { DepartmentsState, getDepartments } from "~/store/departmentSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  addOptionModuleTeacher,
  getOptionModuleTeachers,
  OptionModuleTeachersState,
} from "~/store/moduleOptionSlice";
import { getOptions, OptionsState } from "~/store/optionSlice";

const OptionModuleTeacherPage = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [searchOption, setSearchOption] = useState("");
  //

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { options } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );

  const { departments } = useAppSelector(
    (state: { departments: DepartmentsState }) => state.departments
  );

  const { optionModuleTeachers } = useAppSelector(
    (state: { moduleOption: OptionModuleTeachersState }) => state.moduleOption
  );

  useEffect(() => {
    dispatch(getOptions());
    dispatch(getDepartments());
    dispatch(getOptionModuleTeachers());
  }, [dispatch]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchOption.toLowerCase())
  );

  const filteredOptionsByDepartment = options.filter(
    (option) =>
      option.name.toLowerCase().includes(searchOption.toLowerCase()) &&
      (!selectedDepartment ||
        option.department.id.toString() === selectedDepartment)
  );

  const filteredData = optionModuleTeachers.filter(
    (item) =>
      (!selectedDepartment ||
        item.option.department.id.toString() === selectedDepartment) &&
      (!selectedOption || item.option.id.toString() === selectedOption)
  );

  return (
    <DataTable
      columns={optionModuleTeacherColumns}
      data={filteredData}
      // filterColumn="option"
      filterComponent={
        <div className="flex space-x-2">
          <Select onValueChange={setSelectedOption}>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Search options"
                  value={searchOption}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchOption(e.target.value)
                  }
                  className="mb-2"
                />
              </div>
              {filteredOptions.map((option) => (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
      createElement={
        <UniversalDialog
          trigger={
            <Button disabled={!selectedOption}>Create Assignment</Button>
          }
          title="Create Option Module Teacher"
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <OptionModuleTeacherForm
            onSubmit={(values) => {
              if (selectedOption) {
                dispatch(
                  addOptionModuleTeacher({
                    ...values,
                    optionId: Number(selectedOption),
                  })
                );
                setIsEditDialogOpen(false);
              } else {
                alert("Please select an option before submitting.");
              }
            }}
          />
        </UniversalDialog>
      }
    />
  );
};

export default OptionModuleTeacherPage;
