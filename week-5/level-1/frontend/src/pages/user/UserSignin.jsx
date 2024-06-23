import { useNavigate } from "react-router-dom";

function UserSignin() {
    const navigate = useNavigate();
    return (
        <div>
            User Sign up
            <button onClick={() => navigate("/user/signup")}>Sign Up</button>
        </div>
    )
}

export default UserSignin;