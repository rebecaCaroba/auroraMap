import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    sendPasswordResetEmail 
} from "../dbFirebase";
import { api } from "@/lib/axios";
import { authAdmin } from "../firebase-admin";

export async function signIn(email: string, password: string) {
    let response = null
    let err = null
    try {
        response = await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
        const errorCode = error.code

        if (errorCode == 'auth/invalid-credential') {
            err = 'Email ou senha inválidos'
        } else {
            console.error('Erro ao fazer login', error.message)
        }

    }
    return { response, err }
}

export async function createUser(userName: string, email: string, password: string) {
    let response = null
    let err = null

    try {
        response = await api.post('/auth/cadastro', { userName, email, password })        

        console.log(response)

    } catch (error: any) {
        const errorCode = error.code;

        console.log(error)
        if (errorCode === 'auth/email-already-in-use') {
            err = 'Email já utilizado'
        } else {
            console.error("Erro ao registrar o usuário:", error);
        }
    }

    return { response, err }
}

export async function updateUserName(userName: string) {
    let response = null
    let err = null

    if (!auth.currentUser) {
        err = 'Usuário não autenticado'
        return { response, err }
    }

    await updateProfile(auth.currentUser, { displayName: userName }).then(() => {
        const headerUsername = document.getElementById('header-username');

        if(headerUsername) {
            headerUsername.textContent = userName

            response = userName
        }
        
    }).catch((error) => {
        err = 'Não foi possível atualizar o nome'
        console.error('Erro ao atualizar nome', error.message)
    })

    return { response, err }
}

export async function changePassword(email: string) {
    let response = null
    let err = null

    try {
        if (!auth.currentUser) {
            err = 'Usuário não autenticado'
            return { response, err }
        }

        response = await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
        const errorCode = error.code

        if (errorCode === 'auth/requires-recent-login') {
            err = 'Para alterar a senha, faça login novamente.'
        } else {
            err = 'Não foi possível alterar a senha'
        }

        console.error('Erro ao alterar senha', error.message)
    }

    return { response, err }
}





