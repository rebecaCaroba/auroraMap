import { db, ref, push, get, onValue } from "../dbFirebase";

export interface SetReportZoneType {
    userUid: string | null
    lat: number;
    lng: number;
    dangerType: string;
    severity: string;
    description: string;
}

export interface GetReportZoneType {
    dangerType: string;
    description: string;
    key: string;
    location: {
        lat: number;
        lng: number;
    };
    sevarity: string;
}

export async function setReportZone(data: SetReportZoneType) {
    let response = null
    const contentData = {
        location: {
            lat: data.lat,
            lng: data.lng,
        },
        dangerType: data.dangerType,
        sevarity: data.severity,
        description: data.description,
    }

    try {
        const contentRef = ref(db, `reportZones`)
        const newContentRef = await push(contentRef, contentData)
        
    } catch (error: any) {
        console.error('Erro ', error.message)
    }

    return { response };
}
