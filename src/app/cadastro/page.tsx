import Link from 'next/link';
import './style.scss';

export default function Cadastro() {
    return (
        <main className='cadastro'>
            <section className='cadastro-container'>
                <div className='cadastro-content'>
                    <h1>Cadastro</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome:</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" id="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Senha:</label>
                            <input type="password" name="password" id="password" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirmar senha:</label>
                            <input type="password" name="password" id="password" />
                        </div>

                        <span>
                            Já tem uma conta?<Link href="/login"> Conecte-se</Link>
                        </span>
                        <button type='submit'>Entrar</button>
                    </form>
                </div>
            </section>
        </main>
    )
}