'use client'
import { auth, signOut, onAuthStateChanged} from "@/lib/firebase/dbFirebase";
import { ReactNode, useContext, useState, createContext, useEffect } from "react";
import { User } from "@/lib/firebase/dbFirebase";

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
    function logout() {
        signOut(auth).then(() => {
            setUserData(null)
        }).catch((error) => {
            console.error('Erro ao sair', error);
        })
    }
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserData(user)
            } else {
                setUserData(null)
            }   
        });

        return () => unsub()
    }, [])
            

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