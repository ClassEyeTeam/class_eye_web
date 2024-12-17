import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import ModuleForm from "~/components/forms/module-form";
import { DataTable } from "~/components/table/data-table";
import { moduleColumns } from "~/components/table/module-column";

import { Button } from "~/components/ui/button";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { addModule, getModules, ModulesState } from "~/store/moduleSlice";

const ModulePage = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { modules, loading, error } = useAppSelector(
    (state: { modules: ModulesState }) => state.modules
  );

  useEffect(() => {
    dispatch(getModules());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable
        columns={moduleColumns}
        data={modules}
        filterColumn="name"
        createElement={
          <UniversalDialog
            trigger={<Button>Create New Module</Button>}
            title="Create Module"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <ModuleForm
              onSubmit={(values) => {
                dispatch(addModule(values));
                setIsEditDialogOpen(false);
              }}
            />
          </UniversalDialog>
        }
      />
    </div>
  );
};

export default ModulePage;
