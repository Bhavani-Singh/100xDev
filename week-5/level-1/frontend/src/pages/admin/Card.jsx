import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
function Card() {
    const local = useLocation();
    const navigate = useNavigate();
    const { state } = local;
    const { user } = useAuth();
    const [userData, setUserData] = useState([]);

    async function handleDelete() {
        const result = await axios({
                        method: "post",
                        url: `http://localhost:3000/admin/delete/${state.id}`,
                        headers: {
                            "authorization": user
                        }
                    });

        navigate("/home");
    }

    function handleUpdate() {
        navigate("/form", {state: {id: state.id}});
    }

    // JSON.stringify(state, null, 2)
    useEffect(() => {
        async function fetchUserDate() {
            const result = await axios({
                method: "get",
                url: `http://localhost:3000/admin/populate/${state.id}`,
                headers: {
                    "authorization": user.token,
                }

            })

            setUserData(result.data.result);
        }

        fetchUserDate();
    })

    return (
        <>
        <div style={{ margin: "10px" }}>
            <center>
                <div style={{ border: "0.5px solid black", width: "450px", height: "450px", padding: "15px"}}>
                    <img src={`http://localhost:3000/profilepics/${userData.image}`} width="200px" height="200px" style={{ borderRadius: "50%" }} />
                    <h1>{userData.name}</h1>
                    <p>{userData.designation}</p>
                    <div>
                        <h2>Interests:</h2>
                        {userData && userData.interest && Array.isArray(userData.interest) ? (
                            userData.interest.map((data, index) => (
                                <p key={index} style={{
                                    margin: "5px"
                                }}>{data + " "}</p>
                            ))
                        ) : (
                            <p>No interests available</p>
                        )}
                    </div>
                    <a href={userData.linkedin} style={{
                        padding: "5px",
                        margin: "10px",
                        border: "0.2px solid black",
                        backgroundColor: "silver",
                        textDecoration: "none"
                    }}>LinkedIn</a> 
                    <a href={userData.twitter} style={{
                        padding: "5px",
                        margin: "10px",
                        border: "0.2px solid black",
                        backgroundColor: "silver",
                        textDecoration: "none"
                    }}>Twitter</a><br />
                </div>
            </center>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
        </>
    )
}

export default Card;