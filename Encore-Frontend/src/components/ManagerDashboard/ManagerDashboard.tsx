import { useNavigate } from "react-router-dom"
import "./ManagerDashboard.css"

export default function ManagerDashboard() {
    const navigate = useNavigate();

    return (
        <div>
            Manager Page
            <button onClick={() => navigate("/genrelist")}></button>
        </div>
    )
}