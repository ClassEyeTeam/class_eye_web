import { endOfYear, startOfYear } from "date-fns";
import { useEffect, useState } from "react";
import {
  AttendanceData,
  generateMockData,
  getAttendanceSummary,
} from "~/lib/mockData";

export function useAttendanceData() {
  const currentYear = new Date().getFullYear();
  const [dateRange, setDateRange] = useState<
    [Date | undefined, Date | undefined]
  >([
    startOfYear(new Date(currentYear, 0, 1)),
    endOfYear(new Date(currentYear, 0, 15)),
  ]);
  const [attendanceData, setAttendanceData] = useState<AttendanceData[]>([]);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const newData = generateMockData(dateRange[0], dateRange[1]);
      setAttendanceData(newData);
    }
  }, [dateRange]);

  const summary = getAttendanceSummary(attendanceData);

  return { dateRange, setDateRange, attendanceData, summary };
}
