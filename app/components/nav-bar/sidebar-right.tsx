import * as React from "react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "~/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getOptions, OptionsState } from "~/store/optionSlice";
import { getStatistics, setDateRange } from "~/store/statisticsSlice";
import { RootState } from "~/store/store";
import { getStudentsByOptionId } from "~/store/students/studentSlice";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch();
  const [searchOption, setSearchOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const { options } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );
  const { students } = useAppSelector((state: RootState) => state.students);

  useEffect(() => {
    dispatch(getOptions());
  }, [dispatch]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchOption.toLowerCase())
  );

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    dispatch(getStudentsByOptionId(parseInt(value)));
    setSelectedStudent(null); // Reset selected student when option changes
  };

  const { dateRange } = useAppSelector((state: RootState) => state.statistics);

  // Convert timestamps to Date objects
  const fromDate = new Date(dateRange[0]);
  const toDate = new Date(dateRange[1]);

  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>({
    from: fromDate,
    to: toDate,
  });

  // Sync tempDateRange with Redux dateRange when it changes
  useEffect(() => {
    setTempDateRange({
      from: new Date(dateRange[0]),
      to: new Date(dateRange[1]),
    });
  }, [dateRange]);

  const handleApplyDateRange = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      // Convert Date objects to timestamps
      dispatch(
        setDateRange([tempDateRange.from.getTime(), tempDateRange.to.getTime()])
      );
      dispatch(
        getStatistics({
          optionId: parseInt(selectedOption ?? ""),
          studentId: parseInt(selectedStudent ?? ""),
        })
      );
    }
  };

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l px-2"
      {...props}
    >
      <SidebarContent>
        <SidebarSeparator className="mx-0" />

        <Calendar
          initialFocus
          mode="range"
          defaultMonth={tempDateRange?.from}
          selected={tempDateRange}
          onSelect={setTempDateRange}
          numberOfMonths={1}
          className="w-full"
        />

        <Select
          value={selectedOption ?? undefined}
          onValueChange={handleOptionSelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <Input
              type="text"
              placeholder="Search options..."
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              className="w-full"
            />
            {filteredOptions.map((option) => (
              <SelectItem key={option.id} value={option.id.toString()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedStudent ?? undefined}
          onValueChange={setSelectedStudent}
          disabled={!selectedOption}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a student" />
          </SelectTrigger>
          <SelectContent>
            <Input
              type="text"
              placeholder="Search options..."
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              className="w-full"
            />
            {students.map((student) => (
              <SelectItem key={student.id} value={student.id.toString()}>
                {student.lastName}, {student.firstName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          className="w-full mt-4 bg-black text-white hover:bg-gray-800"
          onClick={handleApplyDateRange}
          disabled={!tempDateRange?.from || !tempDateRange?.to}
        >
          Apply Date Range
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}
