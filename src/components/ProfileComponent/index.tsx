'use client'

import { auth, onAuthStateChanged } from '@/lib/firebase/dbFirebase'
import { changePassword, updateUserName } from '@/lib/firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import './style.scss'
import { useUser } from '@/context/UserContext'

const updateNameSchema = zod.object({
    userName: zod.string().min(1, { message: 'O nome é obrigatório' }),
})

const updatePasswordSchema = zod
    .object({
        newPassword: zod.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
        confirmPassword: zod.string().min(8, { message: 'A confirmação de senha deve ter no mínimo 8 caracteres.' }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'As senhas não coincidem.',
        path: ['confirmPassword'],
    })

type ProfileUserData = {
    userName: string
    email: string
    creationTime: string
}

type UpdateNameInputs = zod.infer<typeof updateNameSchema>
type UpdatePasswordInputs = zod.infer<typeof updatePasswordSchema>

export function ProfileComponent() {
    const router = useRouter()
    const { logout } = useUser()
    const [userData, setUserData] = useState<ProfileUserData | null>(null)
    const [nameMessage, setNameMessage] = useState<string>('')
    const [passwordMessage, setPasswordMessage] = useState<string>('')

    const {
        register: registerName,
        handleSubmit: handleSubmitName,
        reset: resetName,
        formState: { errors: nameErrors },
    } = useForm<UpdateNameInputs>({
        resolver: zodResolver(updateNameSchema),
    })

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        reset: resetPassword,
        formState: { errors: passwordErrors },
    } = useForm<UpdatePasswordInputs>({
        resolver: zodResolver(updatePasswordSchema),
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login')
                return
            }

            const profileData = {
                userName: user.displayName || 'Não informado',
                email: user.email || 'Não informado',
                creationTime: user.metadata.creationTime || 'Não informado',
            }

            setUserData(profileData)
            resetName({ userName: user.displayName || '' })
        })

        return () => unsubscribe()
    }, [router, resetName])



    async function handleUpdateName(data: UpdateNameInputs) {
        setNameMessage('')

        const { err } = await updateUserName(data.userName)

        if (err) {
            setNameMessage(err)
            return
        }

        setUserData((prev) => prev ? ({ ...prev, userName: data.userName }) : prev)
        setNameMessage('Nome atualizado com sucesso!')
    }

    function handelLogout() {
        logout()
        router.push('/login')
    }

    async function handleUpdatePassword(data: UpdatePasswordInputs) {
        setPasswordMessage('')

        const { err } = await changePassword(data.newPassword)

        if (err) {
            setPasswordMessage(err)
            return
        }

        setPasswordMessage('Senha atualizada com sucesso!')
        resetPassword()
    }

    return (
        <main className='profile'>
            <section className='profile-container'>
                <h1>Perfil do Usuário</h1>

                <div className='profile-card'>
                    <h2>Informações</h2>

                    <p><strong>Email:</strong> {userData?.email}</p>
                    <p><strong>Data de criação:</strong> {userData?.creationTime}</p>
                </div>

                <div className='profile-card'>
                    <h2>Alterar nome</h2>
                    <form onSubmit={handleSubmitName(handleUpdateName)}>
                        <div className='form-group'>
                            <label htmlFor='userName'>Novo nome:</label>
                            <input id='userName' type='text' {...registerName('userName')} />
                            <span className='form-span-message'>
                                {nameErrors.userName ? nameErrors.userName.message : ''}
                            </span>
                        </div>

                        {nameMessage ? (
                            <span className={`profile-feedback ${nameMessage.includes('sucesso') ? 'success' : 'error'}`}>
                                {nameMessage}
                            </span>
                        ) : null}

                        <button type='submit'>Alterar nome</button>
                    </form>
                </div>

                <div className='profile-card'>
                    <h2>Alterar senha</h2>

                        {passwordMessage ? (
                            <span className={`profile-feedback ${passwordMessage.includes('sucesso') ? 'success' : 'error'}`}>
                                {passwordMessage}
                            </span>
                        ) : null}

                        <button>Alterar senha</button>
                        <button onClick={handelLogout}>Sair</button>
                </div>
            </section>
        </main>
    )
}