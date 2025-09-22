'use client'
import { signIn } from "@/lib/firebase/auth";
import { isEmailCorrect } from "@/utils/isEmailCorrect";
import { IsPasswordCorrect } from "@/utils/isPasswordCorrect";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface ErrorFormType {
    location: string
    message: string
}

export default function FormLogin() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorForm, setErrorForm] = useState<ErrorFormType | null>(null)
    const router = useRouter()


    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            return setErrorForm({
                location: 'empty',
                message: 'Preecha o(s) campo(s) acima'
            })
        }

        const isEmail = isEmailCorrect(email.trim())

        if (isEmail.error == true) {
            return setErrorForm({
                location: "email",
                message: isEmail.message,
            });
        }

        const isPassword = IsPasswordCorrect(password.trim())

        if (isPassword.error == true) {
            return setErrorForm({
                location: "password",
                message: isPassword.message,
            });
        }

        try {
            const { response, err } = await signIn(email, password)

            if (err) {
                return setErrorForm({
                    location: 'password',
                    message: err
                });
            }

            router.push('/mapa')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='login-content'>
            <h1>Login</h1>
            <form onSubmit={(e) => handleLogin(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className='form-span-message'>
                        {errorForm?.location == 'password' || errorForm?.location == 'empty' ? errorForm.message : ''}
                    </span>
                </div>
                <span>
                    Não tem conta?<Link href="/cadastro"> Cadastre-se</Link>
                </span>
                <button type='submit'>Entrar</button>
            </form>
        </div>
    )
}