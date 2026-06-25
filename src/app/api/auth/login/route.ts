import { authAdmin } from "@/lib/firebase/firebase-admin";
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

        const res = NextResponse.json({ success: true });

        res.cookies.set('session', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires / 1000,
            path: '/',
            sameSite: 'lax',
        })

        return res

    } catch (error) {
        return NextResponse.json({ message: "Erro ao criar sessão", error }, { status: 500 })
    }
}