import { useEffect } from "react";
import { SummaryCard } from "~/components/statistics/SummaryCard";
import { useAttendanceData } from "~/hooks/useAttendanceData";

export default function AttendanceDashboard() {
  const { summary, dateRange } = useAttendanceData();
  console.log(dateRange);
  useEffect(() => {
    console.log("dateRange", dateRange);
  }, [dateRange]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Attendance Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <SummaryCard title="Total Sessions" value={summary.totalSessions} />
        <SummaryCard title="Total Attendance" value={summary.totalAttendance} />
        <SummaryCard title="Total Present" value={summary.totalPresent} />
      </div>

      <div className="">{/* <AttendanceChart data={attendanceData} /> */}</div>
    </div>
  );
}
