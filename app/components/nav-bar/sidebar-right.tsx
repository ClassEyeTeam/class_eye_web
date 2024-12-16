import * as React from "react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { NavUser } from "~/components/nav-bar/nav-user";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "~/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { setDateRange } from "~/store/statisticsSlice";
import { RootState } from "~/store/store";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch();
  const { dateRange } = useAppSelector((state: RootState) => state.statistics);

  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>({
    from: dateRange[0],
    to: dateRange[1],
  });

  // Sync tempDateRange with Redux dateRange when it changes
  useEffect(() => {
    setTempDateRange({ from: dateRange[0], to: dateRange[1] });
  }, [dateRange]);

  const handleApplyDateRange = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      dispatch(setDateRange([tempDateRange.from, tempDateRange.to]));
    }
  };

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex">
        <NavUser />
      </SidebarHeader>
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
