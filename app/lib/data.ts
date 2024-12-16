import { BookOpen, SquareTerminal } from "lucide-react";
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
      title: "Statistics",
      url: "/statistics",
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
      ],
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
