"use client"

import { useRouter } from "next/navigation";
import { createContext, Dispatch, useContext, useEffect, useState } from "react";

export type User = {
    id: string;
    name: string;
    role: string;
}

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    logout: () => Promise<void>;

}


const AuthContext = createContext<AuthContextType | null>(null)


export default function AuthProvider ({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

const logout = async () => {
    const res = await fetch("/api/token/logout");

    if(!res.ok) return

    setUser(null);
    router.push("/login");
}


useEffect(() => {
(async () => {
    const res = await fetch("/api/token");

    console.log("USE EFFECT")

    if(!res.ok) {
    setUser(null);
    return
    }

    const data = await res.json();

    setUser(data.user);
    setLoading(false);

})();
}, []);

    return (
        <AuthContext.Provider value={{user, setUser, loading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider")
    }

    return context;
}