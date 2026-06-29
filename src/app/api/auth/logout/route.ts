import { authAdmin } from "@/lib/firebase/firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookiesStore = cookies()
    const sessionCookie = (await cookiesStore).get('session')?.value

    if(sessionCookie) { 
        const decoded = await authAdmin.verifySessionCookie(sessionCookie)
        await authAdmin.revokeRefreshTokens(decoded.sub)
    }
    
    (await cookiesStore).delete("session")
    
    return NextResponse.json({message: "Usuário deslogado"}, {status: 200})
}