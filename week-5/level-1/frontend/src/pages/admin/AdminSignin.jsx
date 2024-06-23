import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

function AdminSignin() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();
    // const navigate = useNavigate();

    async function handleSignIn() {
        // make axios post 
        const result = await axios({
                        method: 'post',
                        url: 'http://localhost:3000/admin/signin',
                        data: {
                            username,
                            password
                        }
                    });

        const token = result.data.token;
        await login({token});
    }

    return (
        <div>
            <center>
            <h1>Admin Sign In</h1>
                <input type="text" value={username} onChange={e => setUserName(e.target.value)}/><br />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
                <button onClick={handleSignIn}>SignIn</button>
            </center>
        </div>
    )
}

export default AdminSignin;