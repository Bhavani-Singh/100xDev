import { useAuth } from "../hooks/useAuth"

function Layout() {
    const { user, logout } = useAuth() ;
    function handleLogout() {
        logout();
    }
    
    return(
        <div>
            <h1>Home</h1>
            <h2>Your token:{user.token}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Layout;