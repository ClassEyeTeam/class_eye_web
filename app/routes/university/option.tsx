import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import OptionForm from "~/components/forms/option-form";
import { DataTable } from "~/components/table/data-table";
import { optionColumns } from "~/components/table/option-columns";
import { Button } from "~/components/ui/button";

import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { addOption, getOptions, OptionsState } from "~/store/optionSlice";

const OptionPage = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { options, loading, error } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );

  useEffect(() => {
    dispatch(getOptions());
  }, [dispatch]);

  return (
    <DataTable
      columns={optionColumns}
      data={options}
      filterColumn="name"
      createElement={
        <UniversalDialog
          trigger={<Button>Create New Option</Button>}
          title="Create Option"
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <OptionForm
            onSubmit={(values) => {
              dispatch(addOption(values));
              setIsEditDialogOpen(false);
            }}
          />
        </UniversalDialog>
      }
    />
  );
};

export default OptionPage;
