"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Attendance, AttendanceStatus, Student } from "~/lib/types";

const formSchema = z.object({
  status: z.nativeEnum(AttendanceStatus),
  studentId: z.number(),
  startTime: z.string().datetime(),
});

type AttendanceFormValues = z.infer<typeof formSchema>;

interface AttendanceFormProps {
  student: Student;
  attendance?: Attendance;
  onSubmit: (values: AttendanceFormValues) => void;
}

export function AttendanceForm({
  student,
  attendance,
  onSubmit,
}: AttendanceFormProps) {
  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: attendance?.status || AttendanceStatus.PRESENT,
      studentId: student.id,
      startTime: attendance?.startTime || new Date().toISOString(),
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Attendance Status for {student.firstName} {student.lastName}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(AttendanceStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {attendance ? "Update Attendance" : "Create Attendance"}
        </Button>
      </form>
    </Form>
  );
}
