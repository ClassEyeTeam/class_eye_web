import { attendanceColumns } from "~/components/table/attendance-columns";
import { DataTable } from "~/components/table/data-table";
import { useAppSelector } from "~/store/hooks";
import { AttendanceState } from "~/store/students/attendanceSlice";
interface AttendanceComponentProps {
  optionId: number;
  sessionId: number;
}
const AttendanceComponent = ({
  optionId,
  sessionId,
}: AttendanceComponentProps) => {
  const { attendances, loading } = useAppSelector(
    (state: { attendance: AttendanceState }) => state.attendance
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const tableColumns = attendanceColumns({
    sessionId: sessionId,
    data: attendances,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Student Attendance</h1>
      <DataTable
        columns={tableColumns}
        data={attendances}
        filterColumn="lastName"
        createElement={<></>}
        sessionId={sessionId}
      />
    </div>
  );
};

export default AttendanceComponent;
