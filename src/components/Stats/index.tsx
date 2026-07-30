import './style.scss';
import { CounterStats } from '../CounterStats';

export function Stats() {

    const statsData =
        [
            { id: 1, value: 2547, label: 'Zonas Mapeadas' },
            { id: 2, value: 8392, label: 'Usuários Ativos' },
            { id: 3, value: 156, label: 'Cidades Cobertas' },
            { id: 4, value: "99%", label: 'Tempo de Atividade' },
        ]

    return (
        <section className="stats">
            <div className="container">
                <div className="stats-grid">
                    {statsData.map((stat) => (
                        <div className="stat-item" key={stat.id}>
                            <h3><CounterStats target={stat.value} /></h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}