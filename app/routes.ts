import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("callback", "routes/callback.tsx"),
  layout("routes/dashboard/dashboard-layout.tsx", [
    route("university", "routes/dashboard/university.tsx"),
  ]),
  layout("routes/university/layout.tsx", [
    route("university/department", "routes/university/department.tsx"),
    route("university/block", "routes/university/block.tsx"),
    route("university/room", "routes/university/room.tsx"),
    route("university/teacher", "routes/university/teacher.tsx"),
    route("university/option", "routes/university/option.tsx"),
    route("university/module", "routes/university/module.tsx"),
    route("university/assignment", "routes/university/assignment.tsx"),
    route("students", "routes/students/students.tsx"),
  ]),
] satisfies RouteConfig;
