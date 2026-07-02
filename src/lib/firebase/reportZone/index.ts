import { AddReportZoneType } from "@/types";
import { db, ref, push, get, onValue } from "../dbFirebase";

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short', 
    }).format(date);
}

export async function addReportZone(data: AddReportZoneType) {
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
        date: formatDate(new Date()),
    }

    try {
        const contentRef = ref(db, `reportZones/${data.userUid}`);
        await push(contentRef, contentData)

    } catch (error: any) {
        console.error('Erro ', error.message)
    }

    return { response };
}
