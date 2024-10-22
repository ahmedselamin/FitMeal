import { Children, createContext, useState } from "react";

//create auth context
export const AuthContext = createContext();

//create provider component
export const AuthProvider = ({ Children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);

    const logout = () => setIsAuthenticated(false);

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {Children}
        </AuthContext.Provider>
    )
}