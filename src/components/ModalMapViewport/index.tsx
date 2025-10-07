'use client'
import { useMap } from '@/context/MapContext'
import { FormEvent, useState } from 'react'
import './style.scss'
import { ClickedPositionType } from '../MapViewport'
import { setReportZone } from '@/lib/firebase/reportZone'
import { useUser } from '@/context/UserContext'

interface ModalMapViewportProps {
    coordinates: ClickedPositionType | null
}

export function ModalMapViewport({ coordinates }: ModalMapViewportProps) {
    const { openModalMap } = useMap()
    const { userUid } = useUser()
    const [dangerType, setDangerType] = useState<string>('')
    const [description, setDescription] = useState<string>('')


    function closeReportModal() {
        openModalMap()
    }

    async function handleAddReportZone(e: FormEvent) {
        e.preventDefault()

        if (!coordinates) {
            return
        }

        try {
            const { lat, lng } = coordinates

            const dataReportZone = {
                userUid,
                lat,
                lng,
                dangerType,
                description
            }

            console.log(dataReportZone)

            const { response } = await setReportZone(dataReportZone)

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div id="reportModal" className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Reportar Zona de Perigo</h2>
                    <span className="close" onClick={closeReportModal}>&times;</span>
                </div>
                <form onSubmit={handleAddReportZone} id="reportForm">
                    <div className="form-group">
                        <label htmlFor="dangerType">Tipo de Perigo:</label>
                        <select name="dangerType" value={dangerType} onChange={(e) => setDangerType(e.target.value)} required>
                            <optgroup label="🔴 Zonas de risco imediato">
                                <option value="assalto">Assalto frequente</option>
                                <option value="agressao">Agressão/violência física</option>
                                <option value="assedio">Assédio sexual</option>
                                <option value="sequestro">Tentativa de sequestro</option>
                            </optgroup>

                            <optgroup label="🟠 Zonas de vulnerabilidade">
                                <option value="iluminacao">Iluminação precária</option>
                                <option value="deserto">Movimento baixo à noite</option>
                                <option value="transporte">Transporte público inseguro</option>
                                <option value="furtos">Furtos/vandalismo</option>
                            </optgroup>

                            <optgroup label="🟡 Zonas de atenção">
                                <option value="aglomeracao">Grande aglomeração</option>
                                <option value="bares">Áreas de bares/vida noturna</option>
                                <option value="eventos">Eventos temporários de risco</option>
                            </optgroup>

                            <optgroup label="🟢 Zonas de apoio">
                                <option value="delegacia">Delegacia/Base policial</option>
                                <option value="hospital">Hospital/UPA</option>
                                <option value="comercio">Comércio 24h</option>
                                <option value="apoio">Ponto de apoio comunitário</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição:</label>
                        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descreva o que aconteceu e forneça detalhes úteis..." required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reporterName">Seu Nome (opcional):</label>
                        <input type="text" name="reporterName" placeholder="Nome ou apelido" />
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