import { db, ref, push, get, onValue } from "../dbFirebase";

export interface SetReportZoneType {
    userUid: string | undefined
    userName?: string
    lat: number;
    lng: number;
    dangerType: string;
    severity: string;
    description: string;
}

export interface GetReportZoneType {
    userUid: string | null
    userName?: string
    dangerType: string;
    description: string;
    key: string;
    location: {
        lat: number;
        lng: number;
    };
    severity: 'Alto' | 'Médio' | 'Baixo';
    date: string
}

export async function setReportZone(data: SetReportZoneType) {
    console.log('Dados recebidos para setReportZone:', data)
    let response = null

    const contentData = {
        userName: data.userName == "" ? 'Usuário Anônimo' : data.userName,
        location: {
            lat: data.lat,
            lng: data.lng,
        },
        dangerType: data.dangerType,
        severity: data.severity,
        description: data.description,
        date: new Date().toISOString().split('T')[0],
    }

    try {
        const contentRef = ref(db, `reportZones`)
        const newContentRef = await push(contentRef, contentData)
        
    } catch (error: any) {
        console.error('Erro ', error.message)
    }

    return { response };
}
