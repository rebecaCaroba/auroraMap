import { authAdmin } from "@/lib/firebase/firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json()

        if(!body.token) {
            return NextResponse.json({ message: "Token não fornecido" }, { status: 400 })
        }

        await authAdmin.verifyIdToken(body.token)

        const expires = 60 * 60 * 24 * 5 * 1000

        const sessionCookie = await authAdmin.createSessionCookie(body.token, { expiresIn: expires })

        const cookieStore = await cookies();

        cookieStore.set('session', sessionCookie, {
            httpOnly: true,
            secure: true,
            maxAge: expires / 1000,
            path: '/',
            sameSite: 'lax',
        })

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ message: "Erro ao fazer login", error }, { status: 500 })
    }
}