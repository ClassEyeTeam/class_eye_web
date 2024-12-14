import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Session } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAppSelector } from "~/store/hooks";
import { OptionModuleTeachersState } from "~/store/moduleOptionSlice";

interface SessionFormProps {
  initialData?: Session | null;
  selectedDate: Date | null;
  selectedOption: number | null;
  onSubmit: (data: {
    moduleOptionId: number;
    startTime: string;
    endTime: string;
  }) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  moduleOptionId: z.number({
    required_error: "Please select a module",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
});

export function SessionForm({
  initialData,
  selectedDate,
  selectedOption,
  onSubmit,
  onCancel,
}: SessionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moduleOptionId:
        initialData?.moduleOptionId || selectedOption || undefined,
      startTime: initialData
        ? new Date(initialData.startDateTime).toTimeString().slice(0, 5)
        : "",
      endTime: initialData
        ? new Date(initialData.endDateTime).toTimeString().slice(0, 5)
        : "",
    },
  });
  const { optionModuleTeachers } = useAppSelector(
    (state: { moduleOption: OptionModuleTeachersState }) => state.moduleOption
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="moduleOptionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Option</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {optionModuleTeachers.length > 0 ? (
                    optionModuleTeachers.map((option) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.module.name} - {option.teacher.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-options">
                      No options available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input
                  id="startTime"
                  type="time"
                  {...field}
                  className="input"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input
                  id="endTime"
                  type="time"
                  {...field}
                  className="input"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedDate && (
          <div>
            <Label>Selected Date</Label>
            <div>{selectedDate.toDateString()}</div>
          </div>
        )}
        <div className="flex justify-between">
          <Button type="submit">
            {initialData?.id ? "Update Session" : "Create Session"}
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
