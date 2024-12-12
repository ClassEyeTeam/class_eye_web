import React from "react";
import { CalendarConfig, DayOfWeek, Session } from "~/lib/types";

interface CalendarGridProps {
  config: CalendarConfig;
  sessions: Session[];
  onSessionClick: (session: Session) => void;
}

export function CalendarGrid({
  config,
  sessions,
  onSessionClick,
}: CalendarGridProps) {
  const hours = [];
  for (let h = config.startHour; h < config.endHour; h++) {
    hours.push(h);
  }

  const getDayName = (day: DayOfWeek) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  const getSessionStyle = (session: Session, hour: number) => {
    const startHour = parseInt(session.startTime.split(":")[0]);
    const endHour = parseInt(session.endTime.split(":")[0]);
    const startMinute = parseInt(session.startTime.split(":")[1]);
    const endMinute = parseInt(session.endTime.split(":")[1]);

    const height = (endHour - startHour + (endMinute - startMinute) / 60) * 100;

    return {
      height: `${height}%`,
      width: "97%",
    };
  };

  return (
    <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr] gap-1">
      <div></div>
      {config.daysToShow.map((day) => (
        <div key={day} className="text-center font-bold">
          {getDayName(day)}
        </div>
      ))}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="text-right pr-2">{`${hour
            .toString()
            .padStart(2, "0")}:00`}</div>
          {config.daysToShow.map((day) => {
            const daySessions = sessions.filter(
              (session) =>
                session.dayOfWeek === day &&
                parseInt(session.startTime.split(":")[0]) === hour
            );
            return (
              <div
                key={`${day}-${hour}`}
                className="border border-gray-200 h-16 relative min-h-full overflow-visible"
              >
                {daySessions.map((session) => {
                  const sessionStyle = getSessionStyle(session, hour);
                  return (
                    <div
                      key={session.id}
                      className="absolute left-0 right-0 m-1 p-1 bg-blue-100 text-[10px] leading-tight cursor-pointer z-10"
                      style={sessionStyle}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSessionClick(session);
                      }}
                    >
                      <p className="font-bold text-base">
                        {session.moduleName}
                      </p>
                      <p>{session.teacher}</p>
                      <p>{session.studentGroup}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
