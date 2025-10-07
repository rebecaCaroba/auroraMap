import { db, ref, set } from "../dbFirebase";

interface SetReportZoneType {
    userUid: string | null
    lat: number;
    lng: number;
    dangerType: string;
    description: string;
}

export async function setReportZone(data: SetReportZoneType) {
    let response = null

    try {
        response = set(ref(db, 'reportZone/' + data.userUid), {
            lat: data.lat,
            lng: data.lng,
            dangerType: data.dangerType,
            description: data.description,
        });

    } catch (error: any) {
        const errorCode = error.code

        console.error('Erro ', error.message)
    }

    return { response };
}
