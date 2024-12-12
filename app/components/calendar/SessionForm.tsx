import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { DayOfWeek, Session } from "~/lib/types";

interface SessionFormProps {
  initialData?: Session;
  onSubmit: (data: Session) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export function SessionForm({
  initialData,
  onSubmit,
  onDelete,
  onCancel,
}: SessionFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<Session>({
    defaultValues: initialData || {
      id: "",
      dayOfWeek: "monday",
      startTime: "08:00",
      endTime: "09:00",
      moduleName: "",
      teacher: "",
      studentGroup: "",
    },
  });

  const dayOfWeek = watch("dayOfWeek");

  const daysOfWeek: DayOfWeek[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="dayOfWeek">Jour de la semaine</Label>
        <Select
          onValueChange={(value: DayOfWeek) => setValue("dayOfWeek", value)}
          defaultValue={dayOfWeek}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un jour" />
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day) => (
              <SelectItem key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="startTime">Heure de début</Label>
        <Input
          id="startTime"
          type="time"
          {...register("startTime")}
          min="08:00"
          max="18:00"
        />
      </div>
      <div>
        <Label htmlFor="endTime">Heure de fin</Label>
        <Input
          id="endTime"
          type="time"
          {...register("endTime")}
          min="08:00"
          max="18:00"
        />
      </div>
      <div>
        <Label htmlFor="moduleName">Nom du module</Label>
        <Input id="moduleName" {...register("moduleName")} />
      </div>
      <div>
        <Label htmlFor="teacher">Enseignant</Label>
        <Input id="teacher" {...register("teacher")} />
      </div>
      <div className="flex justify-between">
        <Button type="submit">
          {initialData ? "Mettre à jour la session" : "Créer une session"}
        </Button>
        {onDelete && (
          <Button type="button" variant="destructive" onClick={onDelete}>
            Supprimer la session
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
