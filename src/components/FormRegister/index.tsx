'use client'
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createUser } from '../../lib/firebase/auth'
import { useRouter } from 'next/navigation';
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';

const RegisterFormSchema = zod.object({
    email: zod.string().min(1, { message: 'O email é obrigatório' }).email('Digite um email válido'),
    password: zod.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
    confirmPassword: zod.string().min(8, { message: 'A confirmação de senha deve ter no mínimo 8 caracteres.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não coincidem.',
        path: ['confirmPassword'],
    })


type RegisterFormDataInputs = zod.infer<typeof RegisterFormSchema>

interface ErrorFormType {
    location: string
    message: string
}

export function FormRegister() {
    const router = useRouter()
    const { handleSubmit, formState: {errors}, register } = useForm<RegisterFormDataInputs>({
        resolver: zodResolver(RegisterFormSchema),
    })

    async function handleCreatAccount(data: RegisterFormDataInputs) {
        
        const { email, password } = data

        try {
            const { response, err } = await createUser(email, password)

            router.push('/mapa')
        } catch (error: any) {
            console.log(error)
        }

    }

    return (
        <form onSubmit={handleSubmit(handleCreatAccount)} className="form-register">
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                />
                <span className='form-span-message'>
                    {errors.email ? errors.email.message : ''}
                </span>
            </div>

            <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    id="password"
                    {...register('password')}
                />

                <span className='form-span-message'>
                    {errors.password ? errors.password.message : ''}
                </span>
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar senha:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                />
                <span className='form-span-message'>
                    {errors.confirmPassword ? errors.confirmPassword.message : ''}
                </span>
            </div>

            <span>
                Já tem uma conta?<Link href="/login"> Conecte-se</Link>
            </span>
            <button type='submit'>Entrar</button>
        </form>
    )
}