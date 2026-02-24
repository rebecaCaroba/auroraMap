'use client'
import { signIn } from "@/lib/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form";

const LoginFormSchema = zod.object({
    email: zod.string().min(1, {message: 'O email é obrigatório'}).email('Digite um email válido'),
    password: zod.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
})

type LoginFormDataInputs = zod.infer<typeof LoginFormSchema>

interface ErrorFormType {
    location: string
    message: string
}

export default function FormLogin() {
    
    const router = useRouter()

    const {formState: {errors}, register, handleSubmit} = useForm<LoginFormDataInputs>({   
        resolver: zodResolver(LoginFormSchema),
    })

    async function handleLogin(data: LoginFormDataInputs) {
        const { email, password } = data

        try {
            await signIn(email, password)

            router.push('/mapa')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='login-content'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="form-login">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" {...register('email')} />
                    <span className='form-span-message'>
                        {errors.email ? errors.email?.message : ''}
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" {...register('password')} />
                    <span className='form-span-message'>
                        {errors.password ? errors.password?.message : ''}
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