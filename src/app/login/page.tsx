import Link from 'next/link'
import './style.scss'
import FormLogin from '@/components/FormLogin'

export default function Login() {
    return (
        <main className='login'>
            <section className='login-container'>
                <FormLogin />
            </section>
        </main>
    )
}