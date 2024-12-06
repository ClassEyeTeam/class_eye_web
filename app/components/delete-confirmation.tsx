import { Button } from "@/components/ui/button";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  itemName: string;
  itemType: string;
}

export function DeleteConfirmation({
  onConfirm,
  onCancel,
  itemName,
  itemType,
}: DeleteConfirmationProps) {
  return (
    <div className="space-y-4">
      <p>
        Are you sure you want to delete the {itemType} "{itemName}"?
      </p>
      <p>This action cannot be undone.</p>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}
