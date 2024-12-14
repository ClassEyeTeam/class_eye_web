import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarConfig, Session, WeekOption } from "@/lib/types";
import { getWeek } from "date-fns";
import { useEffect, useState } from "react";
import { formatDate } from "~/lib/utils";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { getOptionModuleTeachersForOption } from "~/store/moduleOptionSlice";
import { getOptions, OptionsState } from "~/store/optionSlice";
import {
  createSession,
  getSessions,
  SessionsState,
  updateSession,
} from "~/store/sessionSlice";
import { CalendarGrid } from "./CalendarGrid";
import { DayPicker } from "./DayPicker";
import { SessionForm } from "./SessionForm";

interface CalendarProps {
  config: CalendarConfig;
}

const generateWeekOptions = (): WeekOption[] => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const weeks: WeekOption[] = [];

  for (let week = 1; week <= 52; week++) {
    weeks.push({
      value: `${currentYear}-W${week.toString().padStart(2, "0")}`,
      label: `Week ${week} of ${currentYear}`,
    });
  }

  return weeks;
};

const getCurrentWeek = (): string => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(
    ((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7
  );
  return `${now.getFullYear()}-W${week.toString().padStart(2, "0")}`;
};

export function Calendar({ config }: CalendarProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string>(getCurrentWeek());
  const { options } = useAppSelector(
    (state: { options: OptionsState }) => state.options
  );
  const { sessions, error, loading } = useAppSelector(
    (state: { sessions: SessionsState }) => state.sessions
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedOption)
      dispatch(getOptionModuleTeachersForOption(selectedOption));
  }, [selectedOption]);

  useEffect(() => {
    dispatch(getOptions());
  }, []);

  useEffect(() => {
    if (selectedOption) dispatch(getSessions(selectedOption));
  }, [selectedOption]);

  const handleSessionClick = (session: Session | null, clickedDate: Date) => {
    if (!selectedOption && !session) return;

    setSelectedDate(clickedDate);
    if (session) {
      setSelectedSession(session);
    } else if (selectedOption) {
      setSelectedSession({
        id: 0,
        moduleOptionId: selectedOption,
        startDateTime: clickedDate.toISOString(),
        endDateTime: new Date(
          clickedDate.getTime() + 60 * 60 * 1000
        ).toISOString(),
      });
    }
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: {
    startTime: string;
    endTime: string;
    moduleOptionId: number;
  }) => {
    if (selectedDate) {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);

      const startDateTime = new Date(selectedDate);
      const endDateTime = new Date(selectedDate);

      startDateTime.setHours(startHours, startMinutes, 0, 0);
      endDateTime.setHours(endHours, endMinutes, 0, 0);

      const sessionData: Session = {
        ...selectedSession!,
        startDateTime: formatDate(startDateTime),
        endDateTime: formatDate(endDateTime),
        moduleOptionId: data.moduleOptionId,
      };

      if (selectedSession && selectedSession.id) {
        dispatch(updateSession(sessionData));
      } else {
        dispatch(createSession(sessionData));
      }
    }
    setIsFormOpen(false);
    setSelectedSession(null);
    setSelectedDate(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedSession(null);
    setSelectedDate(null);
  };

  const handleDaySelect = (date: Date) => {
    const weekNumber = getWeek(date, { weekStartsOn: 1 });
    const weekString = `${date.getFullYear()}-W${weekNumber
      .toString()
      .padStart(2, "0")}`;
    setSelectedWeek(weekString);
    setSelectedDate(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select onValueChange={(value) => setSelectedOption(Number(value))}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input placeholder="Search options" className="mb-2" />
            </div>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id.toString()}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DayPicker onSelectDay={handleDaySelect} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="text-center">Loading...</div>
        </div>
      ) : selectedOption ? (
        <CalendarGrid
          config={config}
          sessions={sessions}
          onSessionClick={handleSessionClick}
          selectedWeek={selectedWeek}
          selectedOption={selectedOption}
          selectedDate={selectedDate}
        />
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <div className="text-center">Select an option to view sessions</div>
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedSession
                ? "Modifier la session"
                : "Créer une nouvelle session"}
            </DialogTitle>
          </DialogHeader>
          <SessionForm
            initialData={selectedSession}
            selectedDate={selectedDate}
            selectedOption={selectedOption}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
