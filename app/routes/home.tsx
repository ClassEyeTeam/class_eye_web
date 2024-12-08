import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { ModulesPerOptionChart } from "~/components/charts/module-option-chart";
import { TeacherDistributionChart } from "~/components/charts/teacher-distribution-chart";
import { SidebarLeft } from "~/components/nav-bar/sidebar-left";
import { SidebarRight } from "~/components/nav-bar/sidebar-right";

import { ModeToggle } from "~/components/nav-bar/mode-toggle";
import { DepartmentsState, getDepartments } from "~/store/departmentSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  getOptionModuleTeachers,
  OptionModuleTeachersState,
} from "~/store/moduleOptionSlice";
import { getModules, ModulesState } from "~/store/moduleSlice";
import { getOptions, OptionsState } from "~/store/optionSlice";
import { getTeachers, TeachersState } from "~/store/teacherSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { departments } = useAppSelector(
    (state: { departments: DepartmentsState }) => state.departments
  );
  const { teachers } = useAppSelector(
    (state: { teachers: TeachersState }) => state.teachers
  );
  const { modules } = useAppSelector(
    (state: { modules: ModulesState }) => state.modules
  );
  const { options } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );
  const { optionModuleTeachers } = useAppSelector(
    (state: { moduleOption: OptionModuleTeachersState }) => state.moduleOption
  );
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getTeachers());
    dispatch(getOptions());
    dispatch(getModules());
    dispatch(getOptionModuleTeachers());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background dark:bg-gray-800">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 dark:text-gray-200">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 dark:bg-gray-900">
          <div className="min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">
              University Dashboard
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">
                    Total Departments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary dark:text-blue-400">
                    {departments.length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">
                    Total Teachers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary dark:text-blue-400">
                    {teachers.length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">
                    Total Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary dark:text-blue-400">
                    {modules.length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium dark:text-gray-200">
                    Total Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary dark:text-blue-400">
                    {options.length}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <Card className="col-span-1 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-primary dark:text-blue-400">
                    Teacher Distribution by Department
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <TeacherDistributionChart
                    departments={departments}
                    teachers={teachers}
                  />
                </CardContent>
              </Card>
              <Card className="col-span-1 bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-primary dark:text-blue-400">
                    Modules per Option
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ModulesPerOptionChart
                    options={options}
                    optionModuleTeachers={optionModuleTeachers}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
