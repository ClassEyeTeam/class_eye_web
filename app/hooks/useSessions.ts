import { useState } from "react";
import { Session } from "~/lib/types";
import { toast } from "./use-toast";

export function useSessions(initialSessions: Session[] = []) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  const addSession = (newSession: Session) => {
    const isConflict = sessions.some(
      (session) =>
        session.startDateTime === newSession.startDateTime ||
        session.endDateTime === newSession.endDateTime
    );

    if (isConflict) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There is already a session at this time on this day.",
      });
      return;
    }

    setSessions([...sessions, newSession]);
  };

  const updateSession = (updatedSession: Session) => {
    const isConflict = sessions.some(
      (session) =>
        session.id !== updatedSession.id &&
        (session.startDateTime === updatedSession.startDateTime ||
          session.endDateTime === updatedSession.endDateTime)
    );

    if (isConflict) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There is already a session at this time on this day.",
      });
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

  const fetchSessions = async (optionId: number) => {
    // Simulating an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demonstration purposes, we're filtering the initial sessions
    // In a real application, you would fetch this data from an API
    const filteredSessions = initialSessions.filter(
      (session) => session.OptionId === optionId
    );

    setSessions(filteredSessions);
  };

  return { sessions, addSession, updateSession, deleteSession, fetchSessions };
}
