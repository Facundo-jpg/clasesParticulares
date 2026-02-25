import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps { 
  children: React.ReactNode;
}

const authContext = createContext({
    isAuthenticated: false,
    loginAction: (data: any) => {},
    logOut: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const loginAction = (data: any) => {
        localStorage.setItem('user', JSON.stringify(data));
        setIsAuthenticated(true);
    };

    const logOut = () => {
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    return <authContext.Provider value={{ isAuthenticated, loginAction, logOut }}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
}