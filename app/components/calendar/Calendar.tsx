import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { SessionForm } from "@/components/calendar/SessionForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSessions } from "@/hooks/useSessions";
import { testOptions, testSessions } from "@/lib/data";
import { CalendarConfig, Session } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CalendarProps {
  config: CalendarConfig;
}

export function Calendar({ config }: CalendarProps) {
  const { sessions, addSession, updateSession, deleteSession, fetchSessions } =
    useSessions(testSessions);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setIsFormOpen(true);
  };
  const handleFormSubmit = (data: Session) => {
    if (selectedSession) {
      updateSession({
        ...data,
        id: selectedSession.id,
        studentGroup: selectedOption,
      });
    } else {
      addSession({
        ...data,
        id: Date.now().toString(),
        studentGroup: selectedOption,
      });
    }
    setIsFormOpen(false);
    setSelectedSession(null);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setSelectedSession(null);
  };

  const handleSessionDelete = () => {
    if (selectedSession) {
      deleteSession(selectedSession.id);
      setIsFormOpen(false);
      setSelectedSession(null);
    }
  };
  const handleSearch = async () => {
    if (selectedOption) {
      setIsLoading(true);
      try {
        await fetchSessions(selectedOption);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredSessions = selectedOption
    ? sessions.filter((session) => session.studentGroup === selectedOption)
    : sessions;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Select onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <div className="p-2">
                <Input
                  placeholder="Search options"
                  value={selectedOption}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSelectedOption(e.target.value)
                  }
                  className="mb-2"
                />
              </div>
              {testOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>Créer une nouvelle session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSession
                  ? "Modifier la session"
                  : "Créer une nouvelle session"}
              </DialogTitle>
            </DialogHeader>
            <SessionForm
              initialData={selectedSession || undefined}
              onSubmit={handleFormSubmit}
              onDelete={selectedSession ? handleSessionDelete : undefined}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>
      </div>
      <CalendarGrid
        config={config}
        sessions={sessions}
        onSessionClick={handleSessionClick}
      />
    </div>
  );
}
