import { NextRequest, NextResponse } from "next/server";

export async function proxy(request:NextRequest) {

    const hasSessionCookie = request.cookies.has('session') 

    if(!hasSessionCookie) { 
        return NextResponse.redirect(new URL('/login', request.url)) 
    }

    NextResponse.next()
}

export const config = {
    matcher: ['/mapa', '/perfil',]
}