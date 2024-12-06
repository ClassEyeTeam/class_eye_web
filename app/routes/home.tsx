import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { SidebarLeft } from "~/components/nav-bar/sidebar-left";
import { SidebarRight } from "~/components/nav-bar/sidebar-right";

import { UniversalDialog } from "~/components/dialog";
import { DepartmentForm } from "~/components/forms/department-form";
import { ModeToggle } from "~/components/nav-bar/mode-toggle";
import { DataTable } from "~/components/table/data-table";
import { departmentColumns } from "~/components/table/department-columns";
import { Button } from "~/components/ui/button";
import { toast } from "~/hooks/use-toast";
import {
  addDepartment,
  DepartmentsState,
  getDepartments,
} from "~/store/departmentSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

export default function Page() {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { departments, loading, error } = useAppSelector(
    (state: { departments: DepartmentsState }) => state.departments
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background  ">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
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

          {/* <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
          <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" /> */}
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
