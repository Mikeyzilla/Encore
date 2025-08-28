import type { RouteObject } from "react-router-dom";
import GenrePage from "../components/GenrePage/GenrePage";
import BandList from "../components/BandList/BandList";
import BandProfilePage from "../components/BandProfile/BandProfilePage";
import CreateAccount from "../components/CreateAccount/CreateAccount";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <GenrePage /> },
  { path: "/:genre", element: <BandList /> },        
  { path: "/:genre/:name", element: <BandProfilePage/> },
  { path: "/createAccount", element: <CreateAccount />}
];