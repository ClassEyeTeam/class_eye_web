"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PresentDayDto } from "~/lib/types";

interface AttendanceChartProps {
  data: PresentDayDto[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-border">
        <p className="text-sm font-medium mb-1">
          {new Date(label).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-teal-600">
          Present: {data.present} (
          {((data.present * 100) / (data.present + data.absent)).toFixed(2)}%)
        </p>
        <p className="text-sm text-coral-600">
          Absent: {data.absent}{" "}
          {((data.absent * 100) / (data.present + data.absent)).toFixed(2)}%)
        </p>
      </div>
    );
  }
  return null;
};

export function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Attendance Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString(undefined, {
                    weekday: "short",
                  })
                }
                stroke="#888888"
                fontSize={12}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="present"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ fill: "#0EA5E9", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#0EA5E9" }}
              />
              <Line
                type="monotone"
                dataKey="absent"
                stroke="#F43F5E"
                strokeWidth={2}
                dot={{ fill: "#F43F5E", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#F43F5E" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
