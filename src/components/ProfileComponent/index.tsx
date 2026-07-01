'use client'

import { auth, onAuthStateChanged } from '@/lib/firebase/dbFirebase'
import { changePassword, updateUserName } from '@/lib/firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useUser } from '@/context/UserContext'
import { User } from '@/types'
import './style.scss'

const updateNameSchema = zod.object({
    userName: zod.string().min(1, { message: 'O nome é obrigatório' }),
})

type UpdateNameInputs = zod.infer<typeof updateNameSchema>

export function ProfileComponent({user}: {user: User}) {
    const router = useRouter()
    const { logout } = useUser()

    const {
        register: registerName,
        handleSubmit: handleSubmitName,
        reset,
        setValue,
        formState: { errors: nameErrors },
    } = useForm<UpdateNameInputs>({
        resolver: zodResolver(updateNameSchema),
    })

    async function handleUpdateName(data: UpdateNameInputs) {
        await updateUserName(data.userName)
    }

    async function handleChangePassword() {
        try {

            if(!user?.email) {
                alert('Email do usuário não encontrado. Tente novamente mais tarde.')
                return
            }

            await changePassword(user.email)

            
        } catch (error) {
            console.error('Erro ao solicitar redefinição de senha:', error)
            return
        }

        alert('E-mail de redefinição de senha enviado!')
    }

    function handelLogout() {
        logout()
        router.push('/login')
    }

    return (
        <main className='profile'>
            <section className='profile-container'>
                <h1>Perfil do Usuário</h1>

                <div className='profile-card'>
                    <h2>Informações</h2>

                    <p><strong>Email:</strong> {user?.email}</p>
                </div>

                <div className='profile-card'>
                    <h2>Alterar nome</h2>
                    <form onSubmit={handleSubmitName(handleUpdateName)}>
                        <div className='form-group'>
                            <label htmlFor='userName'>Novo nome:</label>
                            <input id='userName' type='text' {...registerName('userName')} placeholder={"Digite seu nome"} />
                            <span className='form-span-message'>
                                {nameErrors.userName ? nameErrors.userName.message : ''}
                            </span>
                        </div>

                        <div className='form-group checkbox'>
                            <label htmlFor="showName">Exibir o nome nas zonas reportadas</label>
                            <input id="showName" type="checkbox" />
                        </div>

                        <button type='submit'>Alterar nome</button>


                    </form>
                </div>

                <div className='profile-card'>
                    <div className='profile-card-config'>
                        <button onClick={handleChangePassword}>Alterar senha</button>
                        <button onClick={handelLogout}>Sair</button>
                    </div>
                </div>
            </section>
        </main>
    )
}