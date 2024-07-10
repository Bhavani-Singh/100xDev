import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminHomePage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { user, logout } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        async function searchUser() {
            const result = await axios({
                method: "post",
                url: 'http://localhost:3000/admin/search',
                data: {
                    username: search
                },
                headers: {
                    'authorization': user.token,
                }
            })
            setUsers(result.data.result);
        }

        searchUser();
    }, [search])

    // input box for search
    return (
        <center>
            <br />
            Search: 
            <input type="text" onChange={(e) => {
                setSearch(e.target.value);
            }} /> <br />

            <button onClick={() => {
                logout();
            }}>Logout</button>
            <br /><br />
            <div>
                {users.map((user) => {
                    return(
                        <div key={user._id} onClick={() => {
                            navigate("/card", {state: {id: user._id}});
                        }}>
                            <h2>{user.username}</h2>
                            <h3>{user.name}</h3>
                            <h4>{user.designation}</h4>
                            <br />
                            <br /> 
                        </div>
                    )
                })}
            </div>
        </center>
    )
    
    // button on which clicked should logout
    // a container to display users and when clicked on a user navigate to card page and display entire info

}

export default AdminHomePage;