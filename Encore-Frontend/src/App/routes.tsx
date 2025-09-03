import type { RouteObject } from "react-router-dom";
import GenrePage from "../components/GenrePage/GenrePage";
import BandList from "../components/BandList/BandList";
import BandProfilePage from "../components/BandProfile/BandProfilePage";
import CreateAccount from "../components/CreateAccount/CreateAccount";
import Login from "../components/Login/Login";
import YourProfile from "../components/YourProfile/YourProfile";
import ManagerDashboard from "../components/ManagerDashboard/ManagerDashboard";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <CreateAccount /> },
  { path: "/:genre", element: <BandList /> },        
  { path: "/:genre/:name", element: <BandProfilePage/> },
  { path: "/genrelist", element: <GenrePage />},
  { path: "/viewProfile", element: <YourProfile />},
  { path: "/dashboard", element: <ManagerDashboard />},
  { path: "/login", element: <Login />}
];