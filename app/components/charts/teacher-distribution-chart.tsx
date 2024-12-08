import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Department, Teacher } from "~/lib/types";

interface TeacherDistributionChartProps {
  departments: Department[];
  teachers: Teacher[];
}

export function TeacherDistributionChart({
  departments,
  teachers,
}: TeacherDistributionChartProps) {
  const data = departments.map((dept) => ({
    name: dept.name,
    value: teachers.filter((teacher) => teacher.department.id === dept.id)
      .length,
  }));

  const COLORS = [
    "#22d3ee",
    "#14b8a6",
    "#6366f1",
    "#f43f5e",
    "#64748b",
    "#facc15",
    "#fb923c",
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="hsl(var(--primary))"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
