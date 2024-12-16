import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import { StudentForm } from "~/components/forms/student-form";
import { DataTable } from "~/components/table/data-table";
import { studentColumns } from "~/components/table/student-columns";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getOptions, OptionsState } from "~/store/optionSlice";
import {
  addStudent,
  getStudentsByOptionId,
  StudentState,
} from "~/store/students/studentSlice";

const OptionModuleTeacherPage = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [searchOption, setSearchOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { options } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );

  const { students } = useAppSelector(
    (state: { students: StudentState }) => state.students
  );

  useEffect(() => {
    dispatch(getOptions());
    // dispatch(getStudents());
  }, [dispatch]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchOption.toLowerCase())
  );

  const handleSearch = () => {
    dispatch(getStudentsByOptionId(parseInt(selectedOption!)));
  };

  return (
    <div>
      <DataTable
        columns={studentColumns}
        data={students}
        filterColumn="firstName"
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
            <Button disabled={!selectedOption} onClick={handleSearch}>
              Search
            </Button>
          </div>
        }
        createElement={
          <UniversalDialog
            trigger={
              <Button disabled={!selectedOption}>Create Assignment</Button>
            }
            title="Create Student"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <StudentForm
              onSubmit={(values) => {
                if (selectedOption) {
                  dispatch(
                    addStudent({
                      ...values,
                      optionId: parseInt(selectedOption),
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
        sessionId={0}
      />
    </div>
  );
};

export default OptionModuleTeacherPage;
