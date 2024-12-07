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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DepartmentsState, getDepartments } from "~/store/departmentSlice";
import { useAppDispatch, useAppSelector } from "~/store/hooks";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Option name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  departmentId: z.number({
    required_error: "Please select a department.",
  }),
});

type OptionFormData = z.infer<typeof formSchema>;

interface OptionFormProps {
  option?: OptionFormData;
  onSubmit: (values: OptionFormData) => void;
}

const OptionForm: React.FC<OptionFormProps> = ({ option, onSubmit }) => {
  const form = useForm<OptionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: option || {
      name: "",
      description: "",
      departmentId: 0,
    },
  });

  const dispatch = useAppDispatch();
  const { departments } = useAppSelector(
    (state: { departments: DepartmentsState }) => state.departments
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Option name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Option description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                {departments.length > 0 ? (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id.toString()}
                        >
                          {department.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-destructive">
                    No departments available!
                  </p>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default OptionForm;
