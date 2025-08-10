import Link from 'next/link'
import './style.scss'

export default function Login() {
    return (
        <main className='login'>
            <section className='login-container'>
                <div className='login-content'>
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha:</label>
                            <input type="password" name="password" id="password" />
                        </div>
                        <span>
                            Não tem conta?<Link href="/cadastro"> Cadastre-se</Link>
                        </span>
                        <button type='submit'>Entrar</button>
                    </form>
                </div>
            </section>
        </main>
    )
}