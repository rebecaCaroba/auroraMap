import { child, get, onValue, ref, set } from "firebase/database";
import { db } from "../dbFirebase";

interface SetReportZoneType {
    lat: number;
    lng: number;
    dangerType: string;
    description: string;
}

export async function setReportZone(data: SetReportZoneType) {
    let response = null

    try {
        response = set(ref(db, 'reportZone/'), {
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
