import type { RouteObject } from "react-router-dom";

import GenrePage from "../components/GenrePage/GenrePage";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <GenrePage /> },
];