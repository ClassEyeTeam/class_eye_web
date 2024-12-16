import * as React from "react";

import { useState } from "react";
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
import { useAttendanceData } from "~/hooks/useAttendanceData";
import { RightBarData } from "~/lib/data";
// This is sample data.

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { dateRange, setDateRange, attendanceData, summary } =
    useAttendanceData();
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>({
    from: dateRange[0],
    to: dateRange[1],
  });

  const handleApplyDateRange = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      setDateRange([tempDateRange.from, tempDateRange.to]);
    }
  };
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border flex">
        <NavUser user={RightBarData.user} />
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
