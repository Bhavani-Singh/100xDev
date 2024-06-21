import { useNavigate } from "react-router-dom";

function UserSelection() {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate("/admin/signin")}>Admin</button>
            <button onClick={() => navigate("/user/signin")}>User</button>
        </div>
    )
}

export default UserSelection;