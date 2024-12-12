import { Calendar } from "@/components/calendar/Calendar";
import { DayOfWeek } from "~/lib/types";

export default function Home() {
  const calendarConfig = {
    startHour: 8,
    endHour: 18,
    daysToShow: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ] as DayOfWeek[],
  };

  return (
    <>
      <Calendar config={calendarConfig} />
    </>
  );
}
