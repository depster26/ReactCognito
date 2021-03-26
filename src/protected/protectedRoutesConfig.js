import protectedPaths from "./protectedPaths";

import Dashboard from "./dashboard/Dashboard";

const PROTECTED_ROUTES = [
  {
    path: protectedPaths.DASHBOARD,
    exact: true,
    key: "dashboard",
    component: Dashboard,
  },
];

export default PROTECTED_ROUTES;
