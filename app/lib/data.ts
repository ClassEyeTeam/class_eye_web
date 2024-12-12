import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
export const LeftBarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "University",
      url: "/",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Blocks",
          url: "/university/block",
        },
        {
          title: "Rooms",
          url: "/university/room",
        },
        {
          title: "Departments",
          url: "/university/department",
        },
        {
          title: "Teachers",
          url: "/university/teacher",
        },
        {
          title: "Options",
          url: "/university/option",
        },
        {
          title: "Module",
          url: "/university/module",
        },
        {
          title: "Assignment",
          url: "/university/assignment",
        },
      ],
    },
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Students",
          url: "/students",
        },
        {
          title: "Sessions",
          url: "/sessions",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
export const RightBarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
};

import { Session } from "@/lib/types";

export const testOptions = [
  { value: "info1", label: "Informatique 1ère année" },
  { value: "info2", label: "Informatique 2ème année" },
  { value: "math1", label: "Mathématiques 1ère année" },
  { value: "math2", label: "Mathématiques 2ème année" },
];

export const testSessions: Session[] = [
  {
    id: "1",
    dayOfWeek: "monday",
    startTime: "08:00",
    endTime: "10:00",
    moduleName: "Algorithmes",
    teacher: "Dr. Dupont",
    studentGroup: "info1",
  },
  {
    id: "2",
    dayOfWeek: "monday",
    startTime: "10:00",
    endTime: "12:00",
    moduleName: "Bases de données",
    teacher: "Prof. Martin",
    studentGroup: "info2",
  },
  {
    id: "3",
    dayOfWeek: "tuesday",
    startTime: "09:00",
    endTime: "11:00",
    moduleName: "Analyse",
    teacher: "Dr. Lefevre",
    studentGroup: "math1",
  },
  {
    id: "4",
    dayOfWeek: "wednesday",
    startTime: "14:00",
    endTime: "16:00",
    moduleName: "Algèbre linéaire",
    teacher: "Prof. Dubois",
    studentGroup: "math2",
  },
  {
    id: "5",
    dayOfWeek: "thursday",
    startTime: "10:00",
    endTime: "12:00",
    moduleName: "Programmation orientée objet",
    teacher: "Dr. Moreau",
    studentGroup: "info1",
  },
  {
    id: "6",
    dayOfWeek: "friday",
    startTime: "13:00",
    endTime: "15:00",
    moduleName: "Statistiques",
    teacher: "Prof. Petit",
    studentGroup: "math2",
  },
];
