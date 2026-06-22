import { NextResponse } from "next/server"
import { authAdmin } from "@/lib/firebase/firebase-admin";

export async function POST(request: Request) {
    try {

        const body = await request.json()

        const userRecord = await authAdmin.createUser({
            email: body.email,
            emailVerified: false,
            password: body.password,
            displayName: body.userName,
            disabled: false,
        })

        // await authAdmin.setCustomUserClaims(userRecord.uid, { role: 'user' })

        return NextResponse.json({ message: "Cadastro:", uid: userRecord.uid }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Erro: ", error  }, { status: 500 })
    }
}