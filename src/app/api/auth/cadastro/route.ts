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

        return NextResponse.json({ uid: userRecord.uid }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { 
                code: error.code || "unknown_error",
                message: error.message
            },
            { status: 400 }
        )
    }
}