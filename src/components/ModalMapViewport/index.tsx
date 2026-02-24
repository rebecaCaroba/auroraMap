'use client'
import { useMap } from '@/context/MapContext'
import { FormEvent, useState } from 'react'
import './style.scss'
import { ClickedPositionType } from '../MapViewport'
import { setReportZone } from '@/lib/firebase/reportZone'
import { useUser } from '@/context/UserContext'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'


interface ModalMapViewportProps {
    coordinates: ClickedPositionType | null
}

const newReportZoneFormSchema = zod.object({
    dangerType: zod.string().min(1, 'O tipo de perigo é obrigatório'),
    severity: zod.enum(['Alto', 'Médio', 'Baixo'], { message: 'Selecione um nível de perigo válido' }),
    description: zod.string().min(1, 'A descrição é obrigatória').max(150, 'A descrição deve ter no máximo 150 caracteres'),
    userName: zod.string()
        .max(30, 'O nome deve ter no máximo 30 caracteres')
        .optional()
})

type NewReportZoneFormDataInputs = zod.infer<typeof newReportZoneFormSchema>

export function ModalMapViewport({ coordinates }: ModalMapViewportProps) {
    const { openModalMap } = useMap()
    const { userUid } = useUser()

    const { register, handleSubmit, formState: { errors } } = useForm<NewReportZoneFormDataInputs>({
        resolver: zodResolver(newReportZoneFormSchema),
    })

    function closeReportModal() {
        openModalMap()
    }

    async function handleAddReportZone(data: NewReportZoneFormDataInputs) {
        console.log('Dados do formulário:', data)

        const {
            dangerType,
            severity,
            description,
            userName,
        } = data

        if (!coordinates) {
            return
        }

        try {
            const { lat, lng } = coordinates

            const dataReportZone = {
                userUid,
                userName,
                lat,
                lng,
                dangerType,
                severity,
                description,
            }


            await setReportZone(dataReportZone)

            openModalMap()
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
                <form onSubmit={handleSubmit(handleAddReportZone)} id="reportForm">
                    <div className="form-group">
                        <label htmlFor="dangerType">Tipo de Perigo:</label>
                        <input type="text" {...register('dangerType')} required placeholder='Assaltos, violência...' />
                        <span className='form-span-message'>
                            {errors.dangerType ? errors.dangerType.message : ''}
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="severity">Nível de Perigo:</label>
                        <select id="severity"  {...register('severity')} required>
                            <option value="">Selecione o nível</option>
                            <option value="Alto">Alto - Perigo Iminente</option>
                            <option value="Médio">Médio - Cuidado Necessário</option>
                            <option value="Baixo">Baixo - Atenção</option>
                        </select>
                        <span className='form-span-message'>
                            {errors.severity ? errors.severity.message : ''}
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição:</label>
                        <textarea  {...register('description')} placeholder="Descreva o que aconteceu e forneça detalhes úteis..." required></textarea>
                        <span className='form-span-message'>
                            {errors.description ? errors.description.message : ''}
                        </span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reporterName">Seu Nome (opcional):</label>
                        <input type="text"  {...register('userName')} placeholder="Nome ou apelido" />
                        <span className='form-span-message'>
                            {errors.userName ? errors.userName.message : ''}
                        </span>
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