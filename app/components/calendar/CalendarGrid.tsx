import { Button } from "@/components/ui/button";
import { CalendarConfig, OptionModuleTeacher, Session } from "@/lib/types";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { Eye, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { OptionModuleTeachersState } from "~/store/moduleOptionSlice";
import {
  getAttendances,
  resetAttendances,
} from "~/store/students/attendanceSlice";
import AttendanceComponent from "../attendance";
import { DeleteConfirmation } from "../delete-confirmation";
import { UniversalDialog } from "../dialog";
import ImageUploadSession from "../forms/image-upload-session";
interface CalendarGridProps {
  config: CalendarConfig;
  sessions: Session[];
  onSessionClick: (
    session: Session | null,
    clickedDate: Date,
    isDelete?: boolean
  ) => void;
  selectedWeek: string;
  selectedOption: number | null;
  selectedDate: Date | null;
}

export function CalendarGrid({
  config,
  sessions,
  onSessionClick,
  selectedWeek,
  selectedOption,
  selectedDate,
}: CalendarGridProps) {
  const dispatch = useAppDispatch();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);
  const hours = [];
  for (let h = config.startHour; h < config.endHour; h++) {
    hours.push(h);
  }
  const { optionModuleTeachers } = useAppSelector(
    (state: { moduleOption: OptionModuleTeachersState }) => state.moduleOption
  );

  const optionMap: Record<number, OptionModuleTeacher> =
    optionModuleTeachers.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {} as Record<number, OptionModuleTeacher>);

  const getDayName = (date: Date) => {
    return format(date, "EEEE");
  };

  const getSessionStyle = (session: Session) => {
    const startDateTime = new Date(session.startDateTime);
    const endDateTime = new Date(session.endDateTime);
    const startHour = startDateTime.getHours();
    const endHour = endDateTime.getHours();
    const startMinute = startDateTime.getMinutes();
    const endMinute = endDateTime.getMinutes();

    const durationInHours =
      endHour - startHour + (endMinute - startMinute) / 60;

    // Base height calculation
    let height = durationInHours * 100;

    // Add extra height for sessions longer than an hour
    if (durationInHours > 1) {
      const extraHeight = Math.floor(durationInHours - 1) * 10; // Add 10% per additional hour
      height += extraHeight;
    }

    return {
      height: `${height}%`,
      width: "100%",
    };
  };

  const weekStart = selectedDate
    ? startOfWeek(selectedDate, { weekStartsOn: 1 })
    : startOfWeek(new Date(), { weekStartsOn: 1 });

  const handleOpenDeleteDialog = (session: Session) => {
    setSessionToDelete(session);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-0.5">
      <div></div>
      {Array.from({ length: 7 }, (_, i) => {
        const day = addDays(weekStart, i);
        return (
          <div
            key={i}
            className={`text-center lg:font-bold lg:text-xl text-sm font-medium ${
              selectedDate && isSameDay(day, selectedDate) ? "bg-red-200" : ""
            }`}
          >
            {getDayName(day)}
          </div>
        );
      })}
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="text-right pr-2">{`${hour
            .toString()
            .padStart(2, "0")}:00`}</div>
          {Array.from({ length: 7 }, (_, i) => {
            const day = addDays(weekStart, i);
            const daySessions = sessions.filter((session) => {
              const sessionDate = new Date(session.startDateTime);
              return (
                isSameDay(sessionDate, day) && sessionDate.getHours() === hour
              );
            });
            return (
              <div
                key={`${day}-${hour}`}
                className={`border border-gray-200 h-16 relative ${
                  selectedOption ? "cursor-pointer" : "cursor-not-allowed"
                } ${
                  selectedDate && isSameDay(day, selectedDate)
                    ? "border-red-200"
                    : ""
                }`}
                onClick={() => {
                  // Check if the cell is empty (no sessions for this day and hour)
                  if (selectedOption && daySessions.length === 0) {
                    const clickedDate = new Date(day);
                    clickedDate.setHours(hour);
                    onSessionClick(null, clickedDate);
                  }
                }}
              >
                {daySessions.map((session) => {
                  const optionData = optionMap[session.moduleOptionId];
                  const moduleName = optionData?.module?.name || "Unknown";
                  const teacherName = optionData?.teacher?.name || "Unknown";

                  return (
                    <div
                      key={session.id}
                      className="absolute bg-indigo-200 text-[10px] leading-tight overflow-hidden cursor-pointer z-10 p-1"
                      style={getSessionStyle(session)}
                    >
                      {optionModuleTeachers.length > 0 && (
                        <>
                          <div className="font-bold">{moduleName}</div>
                          <div>{teacherName}</div>
                        </>
                      )}
                      <div className="flex justify-end mb-1 space-x-1">
                        <UniversalDialog
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDeleteDialog(session)}
                            >
                              <Trash2 className="h-4 w-4" color="red" />
                            </Button>
                          }
                          title="Delete Session"
                          isOpen={isDeleteDialogOpen}
                          onOpenChange={setIsDeleteDialogOpen}
                        >
                          <DeleteConfirmation
                            itemName={moduleName}
                            itemType="Session"
                            onCancel={() => {
                              setIsDeleteDialogOpen(false);
                              setSessionToDelete(null);
                            }}
                            onConfirm={() => {
                              onSessionClick(
                                sessionToDelete,
                                new Date(sessionToDelete?.startDateTime || ""),
                                true
                              );
                              setIsDeleteDialogOpen(false);
                              setSessionToDelete(null);
                            }}
                          />
                        </UniversalDialog>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            // Pass the existing session for editing
                            if (selectedOption) {
                              onSessionClick(
                                session,
                                new Date(session.startDateTime)
                              );
                            }
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modify session</span>
                        </Button>
                        <UniversalDialog
                          className="max-w-[800px]"
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                dispatch(getAttendances(session.id));
                              }}
                            >
                              <Eye className="h-3 w-3" />
                              <span className="sr-only">View session info</span>
                            </Button>
                          }
                          title="Session details"
                          isOpen={isViewDialogOpen}
                          onOpenChange={(open) => {
                            setIsViewDialogOpen(open);
                            if (!open) {
                              dispatch(resetAttendances());
                            }
                          }}
                        >
                          <AttendanceComponent
                            optionId={optionData.option.id}
                            sessionId={session.id}
                          />
                        </UniversalDialog>
                        <ImageUploadSession sessionId={session.id} />
                      </div>
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
