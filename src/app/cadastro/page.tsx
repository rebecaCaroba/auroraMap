import { FormRegister } from '@/components/FormRegister';
import './style.scss';

export default function Cadastro() {
    return (
        <main className='cadastro'>
            <section className='cadastro-container'>
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
                    <div className='cadastro-content'>
                        <h1>Cadastro</h1>
                        <FormRegister />
                    </div>
                </div>
            </section>
        </main>
    )
}