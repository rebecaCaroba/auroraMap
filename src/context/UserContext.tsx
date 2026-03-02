'use client'
import { auth, onAuthStateChanged, signOut} from "@/lib/firebase/dbFirebase";
import { ReactNode, useContext, useState, createContext, useEffect } from "react";

interface UserContextProviderProps {
    children: ReactNode
}

interface UserContextType {
    userUid: string | null
    verifyUser: () => void
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
    const [userUid, setUserUid] = useState<string>('')

    function verifyUser() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                
                const uid = user.uid;
                setUserUid(uid)
                                console.log(' conectado')

            } else {
                // User is signed out
                // ...
                console.log('não conectado')

            }
        });
    }

    function logout() {
        signOut(auth).then(() => {
            setUserUid('')
        }).catch((error) => {
            console.error('Erro ao sair', error);
        })
    }
            

    useEffect(() => {
        verifyUser()
    }, [])

    return (
        <UserContext.Provider value={{
            userUid,
            verifyUser
        }}>
            {children}
        </UserContext.Provider>
    )
}