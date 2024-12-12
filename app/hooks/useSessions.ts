import { useState } from "react";
import { Session } from "~/lib/types";

export function useSessions(initialSessions: Session[] = []) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const addSession = (newSession: Session) => {
    const isConflict = sessions.some(
      (session) =>
        session.dayOfWeek === newSession.dayOfWeek &&
        (session.startTime === newSession.startTime ||
          session.endTime === newSession.endTime)
    );

    if (isConflict) {
      alert("There is already a session at this time on this day.");
      return;
    }

    setSessions([...sessions, newSession]);
  };

  const updateSession = (updatedSession: Session) => {
    const isConflict = sessions.some(
      (session) =>
        session.id !== updatedSession.id &&
        session.dayOfWeek === updatedSession.dayOfWeek &&
        session.startTime === updatedSession.startTime &&
        session.endTime === updatedSession.endTime
    );

    if (isConflict) {
      alert("There is already a session at this time on this day.");
      return;
    }

    setSessions(
      sessions.map((session) =>
        session.id === updatedSession.id ? updatedSession : session
      )
    );
  };

  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId));
  };

  const fetchSessions = async (studentGroup: string) => {
    // Simulating an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demonstration purposes, we're filtering the initial sessions
    // In a real application, you would fetch this data from an API
    const filteredSessions = initialSessions.filter(
      (session) => session.studentGroup === studentGroup
    );

    setSessions(filteredSessions);
  };

  return { sessions, addSession, updateSession, deleteSession, fetchSessions };
}
