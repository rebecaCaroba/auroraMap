
import { app, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../dbFirebase";

export async function signIn(email: string, password: string) {
    let response = null
    let err = null
    try {
        response = await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
        const errorCode = error.code

        if(errorCode == 'auth/invalid-credential') {
            err = 'Email ou senha inválidos'
        } else {
            console.error('Erro ao fazer login', error.message)
        }
        
    }
    return { response, err }
}

export async function createUser(email: string, password: string) {
    let response = null
    let err = null

    try {
        response = await createUserWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
            err = 'Email já utilizado'
        } else {
            console.error("Erro ao registrar o usuário:", error.message);
        } 
    }
    return { response, err }
}

