import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({children}) {
    const [ user, setUser ] = useLocalStorage("userToken", null);
    const navigate = useNavigate();

     const login = async (data) => {
        await setUser(data);
        navigate("/home");
    }

    const logout = () => {
        setUser(null);
        navigate("/", {replace: true});
    }

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}

export const useAuth = () => {
    return useContext(AuthContext);
}