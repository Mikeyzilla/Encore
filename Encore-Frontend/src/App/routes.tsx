import type { RouteObject } from "react-router-dom";
import GenrePage from "../components/GenrePage/GenrePage";
import BandList from "../components/BandList/BandList";
import BandProfilePage from "../components/BandProfile/BandProfilePage";
import CreateAccount from "../components/CreateAccount/CreateAccount";
import Login from "../components/Login/Login";
import ManagerDashboard from "../components/ManagerDashboard/ManagerDashboard";
import AuthorizedUserType from "./AuthorizedUserType";

export const appRoutes: RouteObject[] = [
  { path: "/", element: <CreateAccount /> },
  { path: "/:genre", element: <BandList /> },        
  { path: "/:genre/:name", element: <BandProfilePage/> },
  { path: "/genrelist", element: <AuthorizedUserType expectedRole="Manager" />, children: [
      { index: true, element: <GenrePage /> }
    ]
  },
  { path: "/dashboard", element: <AuthorizedUserType expectedRole="Manager" />, children: [
    {index: true, element: <ManagerDashboard />},
  ]},
  { path: "/login", element: <Login />}
];