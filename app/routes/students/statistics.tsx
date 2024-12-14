"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { AttendanceChart } from "~/components/statistics/AttendanceChart";
import { SummaryCard } from "~/components/statistics/SummaryCard";
import { useAttendanceData } from "~/hooks/useAttendanceData";

export default function AttendanceDashboard() {
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

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
  };

  return (
    <div className="p-6  ">
      <h1 className="text-3xl font-bold mb-6">Attendance Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <SummaryCard title="Total Sessions" value={summary.totalSessions} />
        <SummaryCard title="Total Attendance" value={summary.totalAttendance} />
        <SummaryCard title="Total Present" value={summary.totalPresent} />
      </div>

      <div className="grid gap-6 md:grid-cols-[300px,1fr]">
        <Card className="h-fit">
          <CardContent className="p-4">
            <p className="text-sm font-medium mb-2">Selected Range:</p>
            <p className="text-sm mb-4">
              {formatDateRange(dateRange[0], dateRange[1])}
            </p>
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
          </CardContent>
        </Card>
        <AttendanceChart data={attendanceData} />
      </div>
    </div>
  );
}
