import {
  AttendanceData,
  generateMockData,
  getAttendanceSummary,
} from "@/lib/mockData";
import { endOfWeek, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";

export function useAttendanceData() {
  const [dateRange, setDateRange] = useState<[Date, Date]>(() => {
    const now = new Date();
    return [startOfWeek(now), endOfWeek(now)];
  });
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  useEffect(() => {
    const newData = generateMockData(dateRange[0], dateRange[1]);
    setAttendanceData(newData);
  }, [dateRange]);

  const summary = getAttendanceSummary(attendanceData);

  return { dateRange, setDateRange, attendanceData, summary };
}
