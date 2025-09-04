import { useState } from "react";
import "./Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { centralizeURL } from "../../utils/centralizeURL";

export default function Login() {
    const [roleType, setRoleType] = useState("");
    const [thisUserName, setThisUserName] = useState("");
    const [thisPassword, setThisPassword] = useState("");

    const navigate = useNavigate();

    const tryLoggingIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/users/login`,
                {
                    username: thisUserName,
                    password: thisPassword,
                    role: roleType
                }
            );
            if (response.data) {
                if (roleType === "Manager") {
                    sessionStorage.setItem("userIdentifier", response.data.userId);
                    navigate("/dashboard");
                } else {
                    sessionStorage.setItem("bandId", String(response.data.bandId));
                    const bandRes = await axios.get(`http://localhost:8080/api/bands/${sessionStorage.getItem("bandId")}`);
                    const band = bandRes.data;
                    const nameOfTheBand = (band?.bandName ?? "").trim();
                    const genre = (band?.genreOfMusic ?? "").trim();
                    sessionStorage.setItem("userIdentifier", response.data.userId);
                    navigate(`/${encodeURIComponent(centralizeURL(genre))}/${encodeURIComponent(centralizeURL(nameOfTheBand))}`);
                }
            } else {
                alert("Invalid username, password, or role supplied");
            }
        } catch (err) {
            console.error(err);
            alert(err);
        }
    }

    return (
        <div className="LoginPage">
            <div className="LoginTop">
                <h1 className="NameOfBrand">Encore</h1>
            </div>
            <form className="LoginForm" onSubmit={tryLoggingIn}>
                <div className="InputArea">
                    <input type="text" placeholder="Username" className="InputField" value={thisUserName} onChange={(e) => setThisUserName(e.currentTarget.value)}></input>
                    <input type="password" placeholder="Password" className="InputField" value={thisPassword} onChange={(e) => setThisPassword(e.currentTarget.value)}></input>
                </div>
                <div className="HelpfulInformation">Are you logging in as a Band, or as a Manager?</div>
                <div className="RadioGroup">
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="Manager"
                            onChange={() => setRoleType("Manager")}
                        />
                        Manager
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="Band"
                            onChange={() => setRoleType("Band")}
                        />
                        Band
                    </label>
                </div>
                <button type="submit" className="LoginButton">Login</button>
            </form>
        </div>
    )
}