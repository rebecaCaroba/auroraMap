import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authAdmin } from "./lib/firebase/firebase-admin";

export async function middleware(request:NextRequest) {

    const hasSessionCookie = request.cookies.has('session') 

    if(!hasSessionCookie) { 
        return NextResponse.redirect(new URL('/login', request.url)) 
    }

    NextResponse.next()
}

export const config = {
    matcher: ['/mapa', '/perfil',]
}