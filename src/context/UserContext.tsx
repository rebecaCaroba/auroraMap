'use client'
import { ReactNode, useContext, useState, createContext } from "react";
import { User } from "@/lib/firebase/dbFirebase";
import { api } from "@/lib/axios";

interface UserContextProviderProps {
    children: ReactNode
}

interface UserContextType {
    userData: User | null
    setUserData: (user: User | null) => void
    logout: () => void
}

export const UserContext = createContext({} as UserContextType);

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser deve ser usado dentro de um UserProvider');
    }
    return context;
}

export function UserProvider({ children }: UserContextProviderProps) {
    const [userData, setUserData] = useState<User | null>(null)

    async function logout() {

        try {
            await api.post('/auth/logout')
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
        }

    }

    return (
        <UserContext.Provider value={{
            userData,
            logout,
            setUserData
        }}>
            {children}
        </UserContext.Provider>
    )
}