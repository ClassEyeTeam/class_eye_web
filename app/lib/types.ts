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
  LATE = "LATE",
}

export interface Attendance {
  id: number;
  status: AttendanceStatus;
  startTime: string;
  endTime?: string;
  studentId: number;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  attendances: Attendance[];
}

// Test data
export const testStudents: Student[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    optionId: 1,
    attendances: [
      {
        id: 1,
        status: AttendanceStatus.PRESENT,
        startTime: "2023-06-01T09:00:00Z",
        studentId: 1,
      },
    ],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    optionId: 1,
    attendances: [
      {
        id: 2,
        status: AttendanceStatus.LATE,
        startTime: "2023-06-01T09:15:00Z",
        studentId: 2,
      },
    ],
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson@example.com",
    optionId: 2,
    attendances: [],
  },
];
