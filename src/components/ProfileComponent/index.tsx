'use client'

import { auth, onAuthStateChanged } from '@/lib/firebase/dbFirebase'
import { changePassword, updateUserName } from '@/lib/firebase/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { User } from '@/types'
import './style.scss'
import { UserReportZones } from '../UserReportZones'
import { MdEdit, MdOutlineKey } from "react-icons/md";
import { api } from '@/lib/axios'


const updateNameSchema = zod.object({
    userName: zod.string().min(1, { message: 'O nome é obrigatório' }),
})

type UpdateNameInputs = zod.infer<typeof updateNameSchema>

export function ProfileComponent({ user }: { user: User }) {
    const router = useRouter()
    const [isOpenEditName, setIsOpenEditName] = useState<boolean>(false)

    const {
        register: registerName,
        handleSubmit: handleSubmitName,
        reset,
        formState: { errors: nameErrors },
    } = useForm<UpdateNameInputs>({
        resolver: zodResolver(updateNameSchema),
    })

    async function handleUpdateName(data: UpdateNameInputs) {
        await updateUserName(data.userName)
    }

    async function handleChangePassword() {
        try {

            if (!user?.email) {
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

    async function handelLogout() {
        try {
            await api.post('/auth/logout')
        } catch (error) {
            console.error('Erro ao fazer logout:', error)
        }


        router.push('/login')
    }

    return (
        <main className='profile'>
            <section className='profile-container'>
                <h1>Perfil</h1>
                <p>Gerencie suas informações e reportes.</p>

                <div className='profile-card'>
                    <div className="info-grid">
                        <div className="profile-info">
                            <h4>NOME</h4>
                            <span>{user?.displayName}</span>
                        </div>
                        <div className="profile-info">
                            <h4>E-MAIL</h4>
                            <span>{user?.email}</span>
                        </div>
                    </div>

                    {
                        isOpenEditName && (

                            <div className='profile-edit-form'>
                                <form onSubmit={handleSubmitName(handleUpdateName)}>
                                    <div className='form-group'>
                                        <label htmlFor='userName'>NOVO NOME:</label>
                                        <input id='userName' type='text' {...registerName('userName')} placeholder={"Digite seu nome"} />
                                        <span className='form-span-message'>
                                            {nameErrors.userName ? nameErrors.userName.message : ''}
                                        </span>
                                    </div>

                                    <button type='submit'>Alterar nome</button>
                                    <button
                                        className='profile-edit-form-btn-cancel'
                                        onClick={() => { setIsOpenEditName((state) => !state) }}
                                    >
                                        Cancelar
                                    </button>
                                </form>
                            </div>
                        )
                    }


                    <div className="profile-edit">
                        <button onClick={() => { setIsOpenEditName((state) => !state) }}> <MdEdit size={20} /> Editar nome</button>
                        <button onClick={handleChangePassword}> <MdOutlineKey size={20} /> Alterar senha</button>
                    </div>
                </div>


                <div className='profile-card'>
                    <UserReportZones user={user} />
                </div>

                <div className='profile-card'>
                    <div className='profile-card-signout'>
                        <div>
                            <strong>Sair da conta</strong>
                            <p>
                                Você precisará fazer login novamente.
                            </p>
                        </div>

                        <button onClick={handelLogout}>Sair</button>
                    </div>
                </div>

            </section>
        </main>
    )
}