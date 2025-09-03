import { useState } from "react";
import "./Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [roleType, setRoleType] = useState("");
    const [thisUserName, setThisUserName] = useState("");
    const [thisPassword, setThisPassword] = useState("");

    const navigate = useNavigate();

    const tryLoggingIn = async () => {
        const response = await axios.post(`http://localhost:8080/api/users/createAnAccount`,
            {
                username: thisUserName,
                password: thisPassword,
                role: roleType
            }
        );
        if (response.data) {
            if (roleType === "manager") {
                navigate("/dashboard");
            } else {
                navigate("/viewProfile");
            }
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