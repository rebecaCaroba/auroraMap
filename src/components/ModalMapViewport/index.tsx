import './style.scss'
export function ModalMapViewport() {
    function closeReportModal() {
        console.log('closeReportModal')
    }

    return (
        <div id="reportModal" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Reportar Zona de Perigo</h2>
                    <span className="close" onClick={closeReportModal}>&times;</span>
                </div>
                <form id="reportForm">
                    <div className="form-group">
                        <label htmlFor="dangerType">Tipo de Perigo:</label>
                        <select id="dangerType" required>
                            <option value="">Selecione o tipo</option>
                            <option value="violence">Violência/Assalto</option>
                            <option value="accident">Acidente de Trânsito</option>
                            <option value="flood">Alagamento</option>
                            <option value="fire">Incêndio</option>
                            <option value="construction">Obra/Obstrução</option>
                            <option value="other">Outro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="severity">Nível de Perigo:</label>
                        <select id="severity" required>
                            <option value="">Selecione o nível</option>
                            <option value="high">Alto - Perigo Iminente</option>
                            <option value="medium">Médio - Cuidado Necessário</option>
                            <option value="low">Baixo - Atenção</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor ="description">Descrição:</label>
                        <textarea id="description" placeholder="Descreva o que aconteceu e forneça detalhes úteis..." required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reporterName">Seu Nome (opcional):</label>
                        <input type="text" id="reporterName" placeholder="Nome ou apelido" />
                    </div>
                    <div className="modal-buttons">
                        <button type="button" className="btn-cancel" onClick={closeReportModal}>Cancelar</button>
                        <button type="submit" className="btn-submit">Enviar Reporte</button>
                    </div>
                </form>
            </div>
        </div>
    )
}