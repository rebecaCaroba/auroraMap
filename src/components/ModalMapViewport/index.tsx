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
    const [severity, setSeverity] = useState<string>('')
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
                severity,
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
                        <select id="dangerType" value={dangerType} onChange={(e) => setDangerType(e.target.value)} required>
                            <option value="">Selecione o tipo</option>
                            <option value="Violência/Assalto">Violência/Assalto</option>
                            <option value="Iluminação precária">Iluminação precária</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="severity">Nível de Perigo:</label>
                        <select id="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} required>
                            <option value="">Selecione o nível</option>
                            <option value="Alto">Alto - Perigo Iminente</option>
                            <option value="Médio">Médio - Cuidado Necessário</option>
                            <option value="Baixo">Baixo - Atenção</option>
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