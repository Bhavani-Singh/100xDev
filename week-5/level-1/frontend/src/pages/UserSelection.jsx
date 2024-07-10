import { useNavigate } from "react-router-dom";

function UserSelection() {
    const navigate = useNavigate();
    return (
        <div>
            <center>
                <button onClick={() => navigate("/admin/signin")}>Admin</button><br />
                <button onClick={() => navigate("/user/signin")}>User</button>
            </center>
        </div>
    )
}

export default UserSelection;