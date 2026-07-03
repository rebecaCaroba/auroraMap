import Link from 'next/link'
import './style.scss'
import FormLogin from '@/components/FormLogin'

export default function Login() {
    return (
        <main className='login'>
            <section className='login-container'>
                <div className="left">
                    <span className='left-logo'>AuroraMap</span>

                    <div className="left-content">
                        <h2>Juntas somos mais <em>seguras</em></h2>
                        <p>Acesse sua conta e continue contribuindo com o mapa colaborativo de segurança para mulheres.</p>
                    </div>

                    <div className="left-stats">
                        <div className="left-stat"><strong>12.4k</strong><span>Reportes ativos</span></div>
                        <div className="left-stat"><strong>8.1k</strong><span>Mulheres protegidas</span></div>
                        <div className="left-stat"><strong>94%</strong><span>Denúncias anônimas</span></div>
                    </div>
                </div>
                <div className="right">
                    <FormLogin />
                </div>
            </section>
        </main>
    )
}