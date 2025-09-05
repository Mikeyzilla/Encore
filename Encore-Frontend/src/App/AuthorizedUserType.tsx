import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UnauthorizedPage from "../components/UnauthroizedPage/UnauthorizedPage";

type AllowedTypes = "Manager" | "Band"

export default function AuthorizedUserType({ expectedRole }: { expectedRole: AllowedTypes }) {
    const IdOfOurUser = sessionStorage.getItem("userIdentifier");
    
    const [usersRole, setUsersRole] = useState("");
    const recognizeRole = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/role/${IdOfOurUser}`);
            if (response.data) {
                setUsersRole(response.data);
                sessionStorage.setItem("role", usersRole);
            }
        } catch(err) {
            console.error(err);
        }
    } 

    useEffect(() => {
        recognizeRole();
    }, [IdOfOurUser]);

    if (usersRole != expectedRole) {
        return <UnauthorizedPage />
    } else {
         return <Outlet />;
    }
}