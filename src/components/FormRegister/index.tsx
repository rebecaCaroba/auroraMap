'use client'
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createUser } from '../../lib/firebase/auth'
import { isEmailCorrect } from '@/utils/isEmailCorrect';
import { isConfirmPassword, IsPasswordCorrect } from '@/utils/isPasswordCorrect';
import { useRouter } from 'next/navigation';

interface ErrorFormType {
    location: string
    message: string
}

export function FormRegister() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [errorForm, setErrorForm] = useState<ErrorFormType | null>(null)
    const router = useRouter()

    async function handleCreatAccount(e: FormEvent) {
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

        const isConfirmPasswordResult = isConfirmPassword(password.trim(), confirmPassword.trim())
        
        if (isConfirmPasswordResult.error == true) {
            return setErrorForm({
                location: "password",
                message: isPassword.message,
            });
        }

        try {
            const { response, err } = await createUser(email, password)

            console.log(err)
            if (err) {
                return setErrorForm({
                    location: 'email',
                    message: err
                });
            }

            router.push('/mapa')
        } catch (error: any) {
            console.log(error)
        }

    }

    return (
        <form onSubmit={(e) => handleCreatAccount(e)}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className='form-span-message'>{errorForm?.location == 'email' ? errorForm.message : ''}</span>
            </div>

            <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar senha:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className='form-span-message'>
                    {errorForm?.location == 'password' || errorForm?.location == 'empty' ? errorForm.message : ''}
                </span>
            </div>

            <span>
                Já tem uma conta?<Link href="/login"> Conecte-se</Link>
            </span>
            <button type='submit'>Entrar</button>
        </form>
    )
}