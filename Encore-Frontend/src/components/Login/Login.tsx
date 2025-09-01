import { useState } from "react";
import "./Login.css"

export default function Login() {
    const [roleType, setRoleType] = useState("");

    return (
        <div className="LoginPage">
            <h1>Encore</h1>
            <form>
                <input type="text" placeholder="Username"></input>
                <input type="password" placeholder="Password"></input>
                <div>Are you logging in as a Band, or as a Manager?</div>
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
                <button type="submit"></button>
            </form>
        </div>
    )
}