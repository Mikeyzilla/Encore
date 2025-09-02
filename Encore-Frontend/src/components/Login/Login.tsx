import { useState } from "react";
import "./Login.css"

export default function Login() {
    const [roleType, setRoleType] = useState("");

    return (
        <div className="LoginPage">
            <div className="LoginTop">
                <h1 className="NameOfBrand">Encore</h1>
            </div>
            <form className="LoginForm">
                <div className="InputArea">
                    <input type="text" placeholder="Username" className="InputField"></input>
                    <input type="password" placeholder="Password" className="InputField"></input>
                </div>
                <div className="HelpfulInformation">Are you logging in as a Band, or as a Manager?</div>
                <div className="RadioGroup">
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="manager"
                            onChange={() => setRoleType("Manager")}
                        />
                        Manager
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="band"
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