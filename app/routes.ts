import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Login/login.tsx"),
  route("select-org", "routes/Login/org-login.tsx"),
  route("scratch", "routes/Scratch/scratch.tsx"),
  route("block-home", "routes/BlockHome/blockHome.tsx"),
] satisfies RouteConfig;
