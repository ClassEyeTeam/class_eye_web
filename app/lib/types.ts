export interface Department {
  id: number;
  name: string;
  description: string;
}

export interface Module {
  id: number;
  name: string;
  description: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  department: Department;
}

export interface Option {
  id: number;
  name: string;
  description: string;
  department: Department;
}

export type TeacherRequest = Omit<Teacher, "department"> & {
  departmentId: number;
};

export type OptionRequest = Omit<Option, "department"> & {
  departmentId: number;
};

export interface OptionModuleTeacher {
  id: number;
  option: Option;
  module: Module;
  teacher: Teacher;
}

export interface OptionModuleTeacherRequest {
  id: number;
  optionId: number;
  moduleId: number;
  teacherId: number;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  optionId: number;
  faceDetectionEnabled?: boolean;
}
export interface Block {
  id: number;
  name: string;
  description: string;
  // rooms: Room[];
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
  roomType: RoomType;
  block: Block;
}

export type RoomRequest = Omit<Room, "block"> & {
  blockId: number;
};

export enum RoomType {
  AMPHITHEATER = "AMPHITHEATER",
  CLASSROOM = "CLASSROOM",
}

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Session {
  id: number;
  moduleOptionId: number;
  startDateTime: string;
  endDateTime: string;
}

export interface CalendarConfig {
  startHour: number;
  endHour: number;
  daysToShow: DayOfWeek[];
}

export interface WeekOption {
  value: string;
  label: string;
}
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  NOT_RECORDED = "NOT_RECORDED",
}
export interface Attendance {
  id: number;
  student: Student;
  sessionId: number;
  status: AttendanceStatus | null;
  startTime: string;
}

export interface PresentDayDto {
  date: string;
  present: number;
  absent: number;
}

export interface AttendanceStatistics {
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  presentDays: PresentDayDto[];
}
