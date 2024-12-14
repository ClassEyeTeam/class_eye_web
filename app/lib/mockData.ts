import { eachDayOfInterval, format } from "date-fns";

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  presentPercentage: number;
  absentPercentage: number;
}

export function generateMockData(
  startDate: Date,
  endDate: Date
): AttendanceData[] {
  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) => {
    const present = Math.floor(Math.random() * 50) + 30;
    const absent = Math.floor(Math.random() * 20) + 5;
    const total = present + absent;
    return {
      date: format(date, "yyyy-MM-dd"),
      present,
      absent,
      presentPercentage: Number(((present / total) * 100).toFixed(2)),
      absentPercentage: Number(((absent / total) * 100).toFixed(2)),
    };
  });
}

export function getAttendanceSummary(data: AttendanceData[]) {
  const totalSessions = data.length;
  const totalAttendance = data.reduce(
    (sum, day) => sum + day.present + day.absent,
    0
  );
  const totalPresent = data.reduce((sum, day) => sum + day.present, 0);

  return { totalSessions, totalAttendance, totalPresent };
}
