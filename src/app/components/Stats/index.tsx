import './style.scss';

export function Stats() {
    return (
        <section className="stats">
        <div className="container">
            <div className="stats-grid">
                <div className="stat-item">
                    <h3>2,547</h3>
                    <p>Zonas Mapeadas</p>
                </div>
                <div className="stat-item">
                    <h3>8,392</h3>
                    <p>Usuários Ativos</p>
                </div>
                <div className="stat-item">
                    <h3>156</h3>
                    <p>Cidades Cobertas</p>
                </div>
                <div className="stat-item">
                    <h3>99.2%</h3>
                    <p>Tempo de Atividade</p>
                </div>
            </div>
        </div>
    </section>
    )
}