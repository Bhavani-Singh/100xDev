import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminHomePage() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    // basically this is a search page
    // in this page we will make the call for all users so a fetch call for the users info
        // useEffect for making call to fetch all the users and then display it
    // when typed on the search it should only display the search result
    // when clicked on a user it should display the particular user
    // add search bar 
    // add logout button
    // display all the users


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