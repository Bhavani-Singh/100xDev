import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function UserSignin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    async function handleOnClick() {
        const result = await axios({
            method: "post",
            url: "http://localhost:3000/user/signin",
            data: {
                username,
                password
            }
        });

        if(result.status == 200) {
            login(result.data.token);
            const data = {
                            id: result.data.id,
                        };
            navigate("/user/home", {state: data});
        }
        

    }
    return (
        <div>
            <center>
                <h1>User Sign In</h1>
                <input type="text" onChange={e => setUsername(e.target.value)}/><br />
                <input type="password" onChange={e => setPassword(e.target.value)}/><br />
                <button onClick={handleOnClick}>Sign In</button>
            </center>          
        </div>
    )
}

export default UserSignin;