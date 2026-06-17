import { createContext, useState } from "react";

export const AuthContext= createContext();

function AuthProvider({children}){
    const [user,setUser] = useState({
        name: "Demo User",
        email: "demo@octomail.ai"
    });

    const [isAuthenticated, setIsAuthenticated]= useState(false);
    function login(){

    setUser({

        name:"Harikaran",

        email:"hari@gmail.com"

    });

    setIsAuthenticated(
        true
    );

}

function logout(){

    setUser({

        name:"Demo User",

        email:"demo@octomail.ai"

    });

    setIsAuthenticated(
        false
    );

}
    return (
        <AuthContext.Provider value = {{user,setUser,isAuthenticated,setIsAuthenticated,login,logout}}>

            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;