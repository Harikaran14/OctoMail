import { createContext, useState } from "react";

export const AuthContext= createContext();

function AuthProvider({children}){
    const [user,setUser] = useState({
        name: "Demo User",
        email: "demo@octomail.ai"
    });

    const [isAuthenticated, setIsAuthenticated]= useState(false);

    return (
        <AuthContext.Provider value = {{user,setUser,isAuthenticated,setIsAuthenticated}}>

            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;