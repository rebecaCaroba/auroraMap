import { db, ref, push } from "../dbFirebase";

interface SetReportZoneType {
    userUid: string | null
    lat: number;
    lng: number;
    dangerType: string;
    severity: string;
    description: string;
}

export async function setReportZone(data: SetReportZoneType) {
    let response = null
    const contentData = {
        lat: data.lat,
        lng: data.lng,
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
