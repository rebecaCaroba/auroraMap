import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import './style.scss'
import { editReportZone } from '@/lib/firebase/reportZone'
import { GetReportZoneType } from '@/types'


const editReportZoneFormSchema = zod.object({
    dangerType: zod.string().min(1, 'O tipo de perigo é obrigatório'),
    severity: zod.enum(['Alto', 'Médio', 'Baixo'], { message: 'Selecione um nível de perigo válido' }),
    description: zod.string().min(1, 'A descrição é obrigatória').max(200, 'A descrição deve ter no máximo 200 caracteres'),
})

type EditReportZoneFormDataInputs = zod.infer<typeof editReportZoneFormSchema>

interface ModalEditZoneProps {
    zoneEdit: GetReportZoneType;
    setIsShowModalEditZone: (value: boolean) => void;
    userId: string;

}


export function ModalEditZone({zoneEdit, setIsShowModalEditZone, userId}: ModalEditZoneProps) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<EditReportZoneFormDataInputs, unknown>({
        resolver: zodResolver(editReportZoneFormSchema),
        defaultValues: {
            dangerType: zoneEdit.dangerType,
            severity:  zoneEdit.severity,
            description: zoneEdit.description,
        },
    })

    console.log('zoneEdit', zoneEdit)
    async function handleEditZone(data: EditReportZoneFormDataInputs, key: string) {
            try {

                await editReportZone({
                    userUid: userId,
                    key,
                    dangerType: data.dangerType,
                    severity: data.severity,
                    description: data.description,
                })
    
                reset({
                    dangerType: '',
                    severity: 'Baixo',
                    description: '',
                })
            } catch (error) {
                console.error('Erro ao salvar a zona reportada:', error)
            } finally {
                setIsShowModalEditZone(false)
            }
        }


    return (
        <div className="modal-edit-zone">
            <div className="modal-edit-zone-content">
                <form onSubmit={handleSubmit((data) => handleEditZone(data, zoneEdit.key))}>
                    <div className="form-group">
                        <label htmlFor="dangerType">Tipo de Perigo</label>
                        <input
                            type="text"
                            id="dangerType"
                            {...register('dangerType')}
                            defaultValue={zoneEdit.dangerType}
                        />
                        {errors.dangerType && <span className="error">{errors.dangerType.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="severity">Severidade</label>
                        <select
                            id="severity"
                            {...register('severity')}
                            defaultValue={zoneEdit.severity}
                        >
                            <option value="Alto">Alto</option>
                            <option value="Médio">Médio</option>
                            <option value="Baixo">Baixo</option>
                        </select>
                        {errors.severity && <span className="error">{errors.severity.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            {...register('description')}
                            defaultValue={zoneEdit.description}
                        />
                        {errors.description && <span className="error">{errors.description.message}</span>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" >
                            Salvar
                        </button>
                        <button type="button" onClick={() => setIsShowModalEditZone(false)}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )

}