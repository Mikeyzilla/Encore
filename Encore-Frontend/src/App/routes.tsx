import type { RouteObject } from "react-router-dom";

import GenrePage from "../components/GenrePage/GenrePage";
import BandList from "../components/BandList/BandList";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <GenrePage /> },
  { path: "/:genre", element: <BandList />}
];