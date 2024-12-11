import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import { BlockForm } from "~/components/forms/block-form";
import { blockColumns } from "~/components/table/block-column";
import { DataTable } from "~/components/table/data-table";
import { Button } from "~/components/ui/button";

import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  addBlock,
  BlocksState,
  fetchBlocks,
} from "~/store/infrastructure/blockSlice";

const Block = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { blocks, loading, error } = useAppSelector(
    (state: { blocks: BlocksState }) => state.blocks
  );

  useEffect(() => {
    dispatch(fetchBlocks());
  }, [dispatch]);

  return (
    <DataTable
      columns={blockColumns}
      data={blocks}
      filterColumn="name"
      createElement={
        <UniversalDialog
          trigger={
            <Button onClick={() => setIsEditDialogOpen(true)}>Add Block</Button>
          }
          title="Add New Block"
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <BlockForm
            onSubmit={(values) => {
              dispatch(addBlock(values));
              setIsEditDialogOpen(false);
            }}
          />
        </UniversalDialog>
      }
    />
  );
};

export default Block;
