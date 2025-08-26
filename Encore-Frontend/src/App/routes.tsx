import type { RouteObject } from "react-router-dom";
import GenrePage from "../components/GenrePage/GenrePage";
import BandList from "../components/BandList/BandList";
import BandProfile from "../components/BandProfile/BandProfile";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <GenrePage /> },
  { path: "/:genre", element: <BandList /> },        
  { path: "/:genre/:name", element: <BandProfile /> }
];