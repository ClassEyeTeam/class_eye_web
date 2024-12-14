import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WeekOption } from "@/lib/types";

interface WeekFilterProps {
  weeks: WeekOption[];
  selectedWeek: string;
  onWeekChange: (week: string) => void;
}

export function WeekFilter({
  weeks,
  selectedWeek,
  onWeekChange,
}: WeekFilterProps) {
  return (
    <Select onValueChange={onWeekChange} value={selectedWeek}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a week" />
      </SelectTrigger>
      <SelectContent>
        {weeks.map((week) => (
          <SelectItem key={week.value} value={week.value}>
            {week.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
