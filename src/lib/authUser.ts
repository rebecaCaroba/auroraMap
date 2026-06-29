import { cookies } from "next/headers"
import { authAdmin } from "./firebase/firebase-admin"
import { User } from "@/types"

export async function authUser(): Promise<User | null>  {
    const cookiesStore = cookies()
    const sessionCookie = (await cookiesStore).get('session')
    
    if (!sessionCookie) {
        return null
    }

    try {
        const decodedToken = await authAdmin.verifySessionCookie(sessionCookie.value)
        const user = await authAdmin.getUser(decodedToken.uid)


        return {
            uid: user.uid ?? "",
            email: user.email ?? "",
            displayName: user.displayName ?? "",
        } 
    }
    catch (error) {
        console.error("Erro ao autenticar usuário:", error)
        return null
    }
}