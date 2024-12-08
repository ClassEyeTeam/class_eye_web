import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { OptionModuleTeacherRequest } from "~/lib/types";
import { DepartmentsState, getDepartments } from "~/store/departmentSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getModules, ModulesState } from "~/store/moduleSlice";
import { getOptions, OptionsState } from "~/store/optionSlice";
import { getTeachers, TeachersState } from "~/store/teacherSlice";

const formSchema = z.object({
  departmentId: z.number({
    required_error: "Please select a department.",
  }),
  optionId: z.number({
    required_error: "Please select an option.",
  }),
  moduleId: z.number({
    required_error: "Please select a module.",
  }),
  teacherId: z.number({
    required_error: "Please select a teacher.",
  }),
});

type OptionModuleTeacherFormData = z.infer<typeof formSchema>;

interface OptionModuleTeacherFormProps {
  optionModuleTeacher?: OptionModuleTeacherRequest;
  onSubmit: (values: OptionModuleTeacherFormData) => void;
}

const OptionModuleTeacherForm: React.FC<OptionModuleTeacherFormProps> = ({
  optionModuleTeacher,
  onSubmit,
}) => {
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchModule, setSearchModule] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  const form = useForm<OptionModuleTeacherFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentId: undefined,
      optionId: optionModuleTeacher?.optionId,
      moduleId: optionModuleTeacher?.moduleId,
      teacherId: optionModuleTeacher?.teacherId,
    },
  });

  const { departments } = useAppSelector(
    (state: { departments: DepartmentsState }) => state.departments
  );
  const { teachers } = useAppSelector(
    (state: { teachers: TeachersState }) => state.teachers
  );
  const { options } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );
  const { modules } = useAppSelector(
    (state: { modules: ModulesState }) => state.modules
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getTeachers());
    dispatch(getModules());
    dispatch(getOptions());
  }, [dispatch]);

  useEffect(() => {
    if (optionModuleTeacher) {
      const option = options.find((o) => o.id === optionModuleTeacher.optionId);
      if (option) {
        setSelectedDepartmentId(option.department.id);
        form.setValue("departmentId", option.department.id);
      }
    }
  }, [optionModuleTeacher, options, form]);

  useEffect(() => {
    if (selectedDepartmentId === null) {
      form.setValue("teacherId", 0);
      form.setValue("optionId", 0);
    }
  }, [selectedDepartmentId, form]);

  const filteredDepartments = departments.filter((department) =>
    department.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTeacher.toLowerCase()) &&
      (!selectedDepartmentId || teacher.department.id === selectedDepartmentId)
  );

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchModule.toLowerCase())
  );

  const filteredOptions = options.filter(
    (option) =>
      option.name.toLowerCase().includes(searchOption.toLowerCase()) &&
      (!selectedDepartmentId || option.department.id === selectedDepartmentId)
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <Select
                onValueChange={(value) => {
                  const departmentId = Number(value);
                  field.onChange(departmentId);
                  setSelectedDepartmentId(departmentId);
                  form.setValue("optionId", 0);
                  form.setValue("teacherId", 0);
                }}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search departments"
                      value={searchDepartment}
                      onChange={(e) => setSearchDepartment(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {filteredDepartments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={department.id.toString()}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="optionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={!selectedDepartmentId}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedDepartmentId
                          ? "Select an option"
                          : "Select a department first"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search options"
                      value={searchOption}
                      onChange={(e) => setSearchOption(e.target.value)}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teacher</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={!selectedDepartmentId}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        selectedDepartmentId
                          ? "Select a teacher"
                          : "Select a department first"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search teachers"
                      value={searchTeacher}
                      onChange={(e) => setSearchTeacher(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {filteredTeachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id.toString()}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="moduleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="p-2">
                    <Input
                      placeholder="Search modules"
                      value={searchModule}
                      onChange={(e) => setSearchModule(e.target.value)}
                      className="mb-2"
                    />
                  </div>
                  {filteredModules.map((module) => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {optionModuleTeacher ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default OptionModuleTeacherForm;
