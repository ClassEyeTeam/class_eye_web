import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-60 z-50">
      <Loader2
        className={cn(
          "my-28 h-16 w-16 text-primary/60 animate-spin",
          className
        )}
      />
    </div>
  );
};

export default Loader;
