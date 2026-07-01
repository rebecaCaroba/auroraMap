import { authAdmin } from "@/lib/firebase/firebase-admin"
import { NextResponse } from "next/server"

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        body.userName = body.userName.trim()

        const userRecord = await authAdmin.updateUser(body.uid, {
            displayName: body.userName,
        })
        
        console.log('Nome de usuário atualizado com sucesso:', userRecord)

        return NextResponse.json({ message: "Nome de usuário atualizado com sucesso"}, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Erro ao atualizar nome de usuário", error }, { status: 500 })
    }
}