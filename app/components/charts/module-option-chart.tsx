import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Option, OptionModuleTeacher } from "~/lib/types";
import { useTheme } from "next-themes";

interface ModulesPerOptionChartProps {
  options: Option[];
  optionModuleTeachers: OptionModuleTeacher[];
}

export function ModulesPerOptionChart({
  options,
  optionModuleTeachers,
}: ModulesPerOptionChartProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const data = options.map((option) => ({
    name: option.name,
    modules: optionModuleTeachers.filter((omt) => omt.option.id === option.id)
      .length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDarkMode ? "#374151" : "#E5E7EB"}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: isDarkMode ? "#E5E7EB" : "#4B5563" }}
        />
        <YAxis tick={{ fill: isDarkMode ? "#E5E7EB" : "#4B5563" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
            borderColor: isDarkMode ? "#374151" : "#E5E7EB",
            color: isDarkMode ? "#E5E7EB" : "#1F2937",
          }}
        />
        <Legend wrapperStyle={{ color: isDarkMode ? "#E5E7EB" : "#1F2937" }} />
        <Bar dataKey="modules" fill={isDarkMode ? "#3B82F6" : "#2563EB"} />
      </BarChart>
    </ResponsiveContainer>
  );
}
