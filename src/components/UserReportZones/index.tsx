"use client"

import { GetReportZoneType, User } from "@/types";
import { editReportZone, removeReportZone } from "@/lib/firebase/reportZone";
import { db, ref, onValue } from "../../lib/firebase/dbFirebase";
import { useEffect, useState } from "react";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import './style.scss'

const editReportZoneFormSchema = zod.object({
    dangerType: zod.string().min(1, 'O tipo de perigo é obrigatório'),
    severity: zod.enum(['Alto', 'Médio', 'Baixo'], { message: 'Selecione um nível de perigo válido' }),
    description: zod.string().min(1, 'A descrição é obrigatória').max(200, 'A descrição deve ter no máximo 200 caracteres'),
})

type EditReportZoneFormDataInputs = zod.infer<typeof editReportZoneFormSchema>

export function UserReportZones({ user }: { user: User }) {
    const [userReportZonesUser, setUserReportZonesUser] = useState<GetReportZoneType[]>([])
    const [editingZoneKey, setEditingZoneKey] = useState<string | null>(null)
    const [savingZone, setSavingZone] = useState<string | number | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditReportZoneFormDataInputs, unknown>({
        resolver: zodResolver(editReportZoneFormSchema),
        defaultValues: {
            dangerType: '',
            severity: 'Baixo',
            description: '',
        },
    })

    useEffect(() => {
        const unsubscribe = onValue(ref(db, 'reportZones/' + `${user.uid}`), (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setUserReportZonesUser([]);
                return;
            }

            const reportZones = Object.keys(data).flatMap(key => ({
                key,
                ...data[key]
            })) as GetReportZoneType[];

            setUserReportZonesUser(reportZones);
        });
        return () => unsubscribe();
    }, [user.uid])

    function startEditing(zone: GetReportZoneType) {
        setEditingZoneKey(zone.key)
        reset({
            dangerType: zone.dangerType,
            severity: zone.severity,
            description: zone.description,
        })
    }

    function cancelEditing() {
        setEditingZoneKey(null)
        reset({
            dangerType: '',
            severity: 'Baixo',
            description: '',
        })
    }

    async function handleSaveZone(data: EditReportZoneFormDataInputs, key: string) {
        setSavingZone(key)

        try {
            await editReportZone({
                userUid: user.uid,
                key,
                dangerType: data.dangerType,
                severity: data.severity,
                description: data.description,
            })

            setEditingZoneKey(null)
            reset({
                dangerType: '',
                severity: 'Baixo',
                description: '',
            })
        } catch (error) {
            console.error('Erro ao salvar a zona reportada:', error)
        } finally {
            setSavingZone(null)
        }
    }

    async function handleRemoveZone(key: string) {
        const confirmed = window.confirm('Tem certeza que deseja excluir esta zona reportada?')

        if (!confirmed) {
            return
        }

        await removeReportZone(user.uid, key)
    }

    return (
        <div className="report-zones">

            <h2>Zonas Reportadas</h2>

            {userReportZonesUser && userReportZonesUser.length > 0 ? (
                <ul>
                    {userReportZonesUser.map((zone, index) => (
                        <li key={zone.key}>
                            {editingZoneKey === zone.key ? (
                                <form
                                    className="report-zone-form"
                                    onSubmit={handleSubmit((data) => handleSaveZone(data, zone.key))}
                                >
                                    <div className="form-group">
                                        <label htmlFor={`dangerType-${index}`}>Tipo de Perigo</label>
                                        <input
                                            id={`dangerType-${index}`}
                                            type="text"
                                            placeholder="Assaltos, violência..."
                                            {...register('dangerType')}
                                        />
                                        <span className='form-span-message'>
                                            {errors.dangerType ? errors.dangerType.message : ''}
                                        </span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor={`severity-${index}`}>Severidade</label>
                                        <select
                                            id={`severity-${index}`}
                                            {...register('severity')}
                                            required
                                        >
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
                                        <label htmlFor={`description-${index}`}>Descrição</label>
                                        <textarea
                                            id={`description-${index}`}
                                            placeholder="Descreva o que aconteceu e forneça detalhes úteis..."
                                            {...register('description')}
                                            rows={4}
                                        />
                                        <span className='form-span-message'>
                                            {errors.description ? errors.description.message : ''}
                                        </span>
                                    </div>

                                    <div className="report-zone-actions">
                                        <button type="submit" disabled={savingZone === index}>
                                            {savingZone === index ? 'Salvando...' : 'Salvar'}
                                        </button>
                                        <button type="button" className="secondary" onClick={cancelEditing}>
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p><strong>Tipo de Perigo:</strong> {zone.dangerType}</p>
                                    <p><strong>Severidade:</strong> {zone.severity}</p>
                                    <p><strong>Descrição:</strong> {zone.description}</p>
                                    <p><strong>Data:</strong> {zone.date}</p>

                                    <div className="report-zone-actions">
                                        <button type="button" onClick={() => startEditing(zone)}>
                                            Editar
                                        </button>
                                        <button type="button" className="danger" onClick={() => handleRemoveZone(zone.key)}>
                                            Excluir
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma zona reportada.</p>
            )}
        </div>
    )
}