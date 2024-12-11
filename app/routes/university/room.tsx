import { useEffect, useState } from "react";
import { UniversalDialog } from "~/components/dialog";
import { RoomForm } from "~/components/forms/room-form";
import { DataTable } from "~/components/table/data-table";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { roomColumns } from "~/components/table/room-column";
import { Block } from "~/lib/types";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { fetchBlocks } from "~/store/infrastructure/blockSlice";
import {
  addRoom,
  fetchRooms,
  RoomsState,
} from "~/store/infrastructure/roomSlice";

const RoomPage = () => {
  const dispatch = useAppDispatch();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string>("");

  const { blocks } = useAppSelector((state) => state.blocks);
  const { rooms, loading, error } = useAppSelector(
    (state: { rooms: RoomsState }) => state.rooms
  );
  useEffect(() => {
    dispatch(fetchBlocks());
    dispatch(fetchRooms());
  }, [dispatch]);

  const filteredRooms = selectedBlock
    ? rooms.filter((room) => room.block.id === Number(selectedBlock))
    : rooms;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable
      columns={roomColumns}
      data={filteredRooms}
      filterColumn="name"
      filterComponent={
        <div className="w-[200px]">
          <Select value={selectedBlock} onValueChange={setSelectedBlock}>
            <SelectTrigger>
              <SelectValue placeholder="Select Block" />
            </SelectTrigger>
            <SelectContent>
              {blocks.map((block: Block) => (
                <SelectItem key={block.id} value={block.id.toString()}>
                  {block.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
      createElement={
        <UniversalDialog
          trigger={
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              disabled={!selectedBlock}
            >
              Add Room
            </Button>
          }
          title="Add New Room"
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <RoomForm
            onSubmit={(values) => {
              if (selectedBlock) {
                dispatch(
                  addRoom({
                    ...values,
                    blockId: Number(selectedBlock),
                  })
                );
                setIsEditDialogOpen(false);
              } else {
                alert("Please select a block before submitting.");
              }
            }}
          />
        </UniversalDialog>
      }
    />
  );
};

export default RoomPage;
