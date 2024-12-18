import { useEffect } from "react";
import { AttendanceChart } from "~/components/statistics/AttendanceChart";
import { SummaryCard } from "~/components/statistics/SummaryCard";
import Loader from "~/components/ui/loading-spinner";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getStatistics } from "~/store/statisticsSlice";
import { RootState } from "~/store/store";

export default function AttendanceDashboard() {
  const dispatch = useAppDispatch();

  // Access statistics state from Redux store
  const { loading, error, statistics } = useAppSelector(
    (state: RootState) => state.statistics
  );

  console.log(statistics);
  useEffect(() => {
    dispatch(getStatistics({}));
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Attendance Dashboard</h1>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      {statistics && (
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <SummaryCard
            title="Total Sessions"
            value={statistics.totalSessions}
          />
          <SummaryCard title="Total Present" value={statistics.presentCount} />
          <SummaryCard title="Total Absent" value={statistics.absentCount} />
        </div>
      )}

      <div>
        {statistics && <AttendanceChart data={statistics.presentDays} />}
      </div>
    </div>
  );
}
