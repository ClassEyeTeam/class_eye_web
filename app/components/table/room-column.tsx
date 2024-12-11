import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Room } from "~/lib/types";
import { useAppDispatch } from "~/store/hooks";
import { deleteRoom, updateRoom } from "~/store/infrastructure/roomSlice";
import { DeleteConfirmation } from "../delete-confirmation";
import { UniversalDialog } from "../dialog";
import { RoomForm } from "../forms/room-form";

export const roomColumns: ColumnDef<Room>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "roomType",
    header: "Room Type",
  },
  {
    accessorKey: "block.name",
    header: "Block",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const room = row.original;
      const dispatch = useAppDispatch();
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      return (
        <div className="space-x-2">
          <UniversalDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            }
            title="Edit Room"
            isOpen={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
          >
            <RoomForm
              room={room}
              blocks={[]}
              onSubmit={(values) => {
                dispatch(
                  updateRoom({ id: room.id, block: room.block, ...values })
                );
                setIsEditDialogOpen(false);
              }}
            />
          </UniversalDialog>

          <UniversalDialog
            trigger={
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" color="red" />
              </Button>
            }
            title="Delete Room"
            isOpen={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DeleteConfirmation
              itemName={room.name}
              itemType="Room"
              onCancel={() => setIsDeleteDialogOpen(false)}
              onConfirm={() => {
                dispatch(deleteRoom(room.id));
                setIsDeleteDialogOpen(false);
              }}
            />
          </UniversalDialog>
        </div>
      );
    },
  },
];
