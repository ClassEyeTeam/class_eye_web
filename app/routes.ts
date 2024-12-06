import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/university/layout.tsx", [
    route("university/department", "routes/university/department.tsx"),
    route("university/teacher", "routes/university/teacher.tsx"),
  ]),
] satisfies RouteConfig;
