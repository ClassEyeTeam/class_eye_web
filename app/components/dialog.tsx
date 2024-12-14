import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { cn } from "~/lib/utils";

interface UniversalDialogProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string; // Add optional className
}

export function UniversalDialog({
  trigger,
  title,
  children,
  isOpen,
  onOpenChange: setOpen,
  className,
}: UniversalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("max-w-[425px]", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
