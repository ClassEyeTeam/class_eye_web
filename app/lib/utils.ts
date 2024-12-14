import { clsx, type ClassValue } from "clsx";

import { twMerge } from "tailwind-merge";
import { Session } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getWeekNumber = (date: Date) => {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const isSessionInWeek = (session: Session, weekString: string) => {
  const [year, week] = weekString.split("-W");
  const sessionDate = new Date(session.startDateTime);
  const sessionWeek = getWeekNumber(sessionDate);
  return (
    sessionWeek === parseInt(week) &&
    sessionDate.getFullYear().toString() === year
  );
};

export const formatDate = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
};
